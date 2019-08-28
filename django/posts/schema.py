import django
from django.core import serializers
import graphene
import json
from graphene_django import DjangoObjectType
from graphene_django_extras import DjangoSerializerMutation
from .models import Post
from .serializers import PostSerializer

# Schemas make Django models accessible over GraphQL

# A query must be defined in order for Graphene introspection to work
class GraphenePost(DjangoObjectType):
    class Meta:
        model = Post

class Query(graphene.ObjectType):
    posts = graphene.List(GraphenePost)

    def resolve_posts(self, info):
        return Post.objects.all()

class PostMutation(DjangoSerializerMutation):
    class Meta:
        description = "Create and update posts"
        serializer_class = PostSerializer
        only_fields = (
            'title',
            'body'
        )
        # include_fields, exclude_fields, input_field_name and output_field_name


class Mutation(graphene.ObjectType):
    post_create = PostMutation.CreateField()
    post_delete = PostMutation.DeleteField()
    post_update = PostMutation.UpdateField()

