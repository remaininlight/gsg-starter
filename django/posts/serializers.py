from rest_framework import serializers
from .models import Comment, Post

# Serializers control how Django models are converted to (usually) text formats

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['title', 'body']

class PostField(serializers.PrimaryKeyRelatedField):

    def get_queryset(self):
        print('get_queryset')
        return Post.objects.all()

class CommentSerializer(serializers.ModelSerializer):

    post = PostField()

    class Meta:
        model = Comment
        #fields = ['body', 'karma', 'post']
        exclude = []

