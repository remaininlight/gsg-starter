import django
from django.core import serializers
import graphene
import json
from graphene_django_extras import DjangoSerializerMutation
from .serializers import CommentSerializer, PostSerializer

# Schemas make Django models accessible over GraphQL

class PostMutation(DjangoSerializerMutation):
    class Meta:
        description = "Create and update posts"
        serializer_class = PostSerializer
        only_fields = (
            'title',
            'body'
        )
        # include_fields, exclude_fields, input_field_name and output_field_name


class CommentMutation(DjangoSerializerMutation):
    class Meta:
        description = "Create and update comments"
        serializer_class = CommentSerializer
        only_fields = (
            'body',
            'karma',
            'post'
        )
        # include_fields, exclude_fields, input_field_name and output_field_name



class Mutation(graphene.ObjectType):
    post_create = PostMutation.CreateField()
    post_delete = PostMutation.DeleteField()
    post_update = PostMutation.UpdateField()

    comment_create = CommentMutation.CreateField()
    comment_delete = CommentMutation.DeleteField()
    comment_update = CommentMutation.UpdateField()

