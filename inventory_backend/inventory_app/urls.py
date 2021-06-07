from django.urls import path
from . import views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('product/<str:pk>/', views.getProduct, name="product"),
]