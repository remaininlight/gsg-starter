"""gsg_starter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from django.urls import path, include
from django.utils.translation import gettext_lazy as _
from django.views.decorators.csrf import csrf_exempt

from graphene_django.views import GraphQLView
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

from .views import IndexView, GraphIQLView

urlpatterns = [
    #path('', IndexView.as_view(), name="home"),
    path('admin/', admin.site.urls),
    url(r'^v1/graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    url(r'^graphql_ws', GraphIQLView.as_view()),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
    url(r'^.*$', IndexView.as_view()),
]
