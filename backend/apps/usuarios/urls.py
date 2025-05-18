from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet
from .auth_views import CustomTokenObtainPairView, CustomTokenRefreshView, api_status

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),    
    path('auth/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('status/', api_status, name='api_status'),
]
