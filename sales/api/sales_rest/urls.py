from django.urls import path
from .views import api_list_sales, api_list_salesperson, api_list_customers


urlpatterns = [
    path("sales/", api_list_sales, name="api_create_sale"),
    path("customers/", api_list_customers, name="api_create_customer"),
    path("salesperson/", api_list_salesperson, name="api_create_salesperson"),
]
