from django.urls import path
from .views import *

urlpatterns = [
    path('leads/', get_leads),
    path('leads/create/', create_lead),
]