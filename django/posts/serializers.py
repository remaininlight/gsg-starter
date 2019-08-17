from rest_framework import serializers
from .models import Post

# Serializers control how Django models are converted to (usuallu) text formats

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['title', 'body']


