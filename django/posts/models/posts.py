from django.db import models
from django.conf import settings

class Post(models.Model):

    title = models.CharField(max_length=200, blank=True)
    body = models.CharField(max_length=10000, blank=True)
    created = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):

    body = models.CharField(max_length=10000, blank=True)
    karma = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

