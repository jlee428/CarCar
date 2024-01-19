from django.urls import path

from .views import (
    api_list_appointments,
    api_list_technicians,
    api_detail_appointment,
    api_detail_technician,

)

urlpatterns = [
    path(
        "appointments/",
        api_list_appointments,
        name="api_list_appointments",
    ),
    path(
        "technicians/",
        api_list_technicians,
        name="api_list_technicians",
    ),
    path(
        "appointments/<int:pk>/",
        api_detail_appointment,
        name="api_detail_appointment",
    ),
    path(
        "technicians/<int:pk>/",
        api_detail_technician,
        name="api_detail_technician",
    ),
]
