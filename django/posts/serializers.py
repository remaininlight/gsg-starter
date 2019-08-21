from rest_framework import serializers
from .models import Post,Comment

# Serializers control how Django models are converted to (usuallu) text formats

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['title', 'body']

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['post', 'body']
