from django.contrib import admin
from django.urls import path, re_path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView



router = DefaultRouter()
router.register(r'opslogrecords', views.OpslogRecordViewSet,basename="opslogrecords")
router.register(r'users', views.UserViewSet,basename="users")
router.register(r'keys', views.KeyViewSet,basename="keys")
router.register(r'keyrecords', views.KeyRecordViewSet,basename="keyrecords")

urlpatterns = [
    path('', views.api_root),
    path('auth/', include('rest_framework.urls')),
    path('login/', views.login_view, name='login_view'),
    path('logout/', views.logout_view, name='logout_view'),
    path('session/', views.session_view, name='session_view'),
    path('whoami/', views.whoami_view, name='whoami_view'),
    path('', include(router.urls)),
]
