from django.urls import path, include
from .views import *

urlpatterns = [
    path('', productsView.as_view(), name="products")
]