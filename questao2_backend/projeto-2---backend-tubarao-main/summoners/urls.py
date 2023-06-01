from django.urls import path

from . import views
from .views import funfact_delete, funfact_list_create

urlpatterns = [
    path('api/summoners/<int:summoner_id>/', views.api_summoner),
    path('api/summoners/<int:summoner_id>/elo/', views.api_summoner_elo),
    path('api/summoners/', views.api_summoners),
    path('api/funfact/', funfact_list_create, name='funfact-list-create'),
    path('api/funfact/<int:pk>/', funfact_delete, name='funfact-delete'),
]