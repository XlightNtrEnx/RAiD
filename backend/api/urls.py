from django.contrib import admin
from django.urls import path, re_path, include
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'opslogrecords', views.OpslogRecordViewSet,basename="opslogrecords")
router.register(r'users', views.UserViewSet,basename="users")

urlpatterns = [
    path('', views.api_root),
    path('auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
]
