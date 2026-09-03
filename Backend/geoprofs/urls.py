"""
URL configuration for geoprofs project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, serializers, viewsets

class StatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = None
        fields = ["is_online"]

class StatusViewSet(viewsets.ModelViewSet):
    queryset = [True]
    serializer_class = StatusSerializer

router = routers.DefaultRouter()
router.register(r"status", StatusViewSet)

urlpatterns = [
    path("", include("rest_framework.urls", namespace="rest_framework"))
]
