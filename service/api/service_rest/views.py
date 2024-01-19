from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Appointment, Technician, AutomobileVO
from common.json import ModelEncoder
# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "id"]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ['id','name', 'employee_number']

# class TechnicianDetailEncoder(ModelEncoder):
#     model = Technician
#     properties = ['id', 'employee_number']


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [ 'id', 'vin', 'owner', 'date', 'technician', 'reason', 'vip', 'active']
    encoders = {"technician": TechnicianListEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == 'GET':
        appointments =Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder = AppointmentEncoder,
            safe = False
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_number=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician Employee Id does not exist"},
                status=400,
            )
        if AutomobileVO.objects.filter(vin = content["vin"]).exists():
            content["vip"]=True
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder = AppointmentEncoder,
            safe = False
            )


@require_http_methods(["GET","PUT", "DELETE"])
def api_detail_appointment(request, pk):
    if request.method == 'GET':
        try:
            appointments =Appointment.objects.get(id=pk)
            return JsonResponse(
                {"appointments": appointments},
                encoder = AppointmentEncoder,
                safe = False
            )
        except:
            return JsonResponse(
                {"message": "Appointment does exist"},
                status=400,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id = pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        try:
            autovin = Appointment.objects.get(id=pk).vin
            if AutomobileVO.objects.filter(vin = autovin).exists():
                content["vip"] = True
            Appointment.objects.filter(id = pk).update(**content)
            appointment = Appointment.objects.get(id = pk)
            return JsonResponse(
                appointment,
                encoder = AppointmentEncoder,
                safe = False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status = 400
            )




"""The code begins by requiring the HTTP methods GET and POST.
The code then checks to see if the request method is GET, in which case it will return a JSON response with all of the technicians.
If not, it will check for an employee number in the request body and create a new technician object if one does not exist.
Finally, it returns a JSON response with that newly created technician object as well as any other relevant information such as whether or not they are active or their status.
The code attempts to allow users to get a list of all technicians.
If the request method is GET, then the code returns a JSON response with the list of technicians.
If the request method is not GET, then it will return a JSON response with an error message if no technician exists."""
@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder= TechnicianListEncoder,
            safe= False
        )
    else:
        # if not Technician.objects.filter(employee_number = content["employee_number"]).exists():
            try:
                content = json.loads(request.body)
                technician = Technician.objects.create(**content)
                return JsonResponse(
                    technician,
                    encoder = TechnicianListEncoder,
                    safe = False
                )
            except:
                return JsonResponse(
                    {"message": "Could not create Technician"},
                    status=400,
            )



"""The code starts by requiring the HTTP methods PUT and DELETE.
Next, it checks to see if the request is a DELETE request.
If so, it deletes all of the technicians with an ID equal to that of pk from the database.
Otherwise, it returns a JSON response with information about technician 1 (technician = Technician.objects.get(id=pk)).
The code then uses json.loads() on request body to get content as JSON data and tries to update all of the technicians in the database using this data as input for their id and name fields (**content).
It also sets encoder and safe variables based on whether or not there was an error updating any records in the database during this process (try: Technician.objects.filter(id=pk).update(**content) except Technician does not exist: return JsonResponse("Technician does not exist", status = 400).
The code attempts to delete a technician from the database.
The code will use the PUT and DELETE HTTP methods to delete a technician from the database."""

@require_http_methods(["PUT", "DELETE", "GET"])
def api_detail_technician(request, pk):
    if request.method == "GET":
        try:
            technicians = Technician.objects.get(id=pk)
            return JsonResponse(
                {"technicians": technicians},
                encoder= TechnicianListEncoder,
                safe= False
            )
        except:
                return JsonResponse(
                    {"message": "Technician Employee Id does exist"},
                    status=400,
            )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(employee_number = pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
    )
    else:
        content = json.loads(request.body)
        try:
            Technician.objects.filter(id = pk).update(**content)
            technician = Technician.objects.get(employee_number = pk)
            return JsonResponse(
                technician,
                encoder = TechnicianListEncoder,
                safe = False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status = 400
            )
