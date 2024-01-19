from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Sales, SalesPerson, Customer

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["sales_person_name", "employee_number"]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ["customer_name", "customer_address", "customer_phone"]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["customer_name", "customer_phone"]


class SalesListEncoder(ModelEncoder):
    model = Sales
    properties = ["sales_person", "customer", "sale_price", "id"]
    encoders = {
        "sales_person": SalesPersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

    def get_extra_data(self, o):
        return {
            "vin": o.automobile.vin,
        }


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sales.objects.all()
        return JsonResponse({"sales": sales}, encoder=SalesListEncoder, safe=False)
    else:
        try:
            content = json.loads(request.body)
            # SalesPerson.objects.get(employee_number=content["sales_person"])
            # Customer.objects.get(customer_name=content["customer"])
            content = {
                **content,
                "sales_person": SalesPerson.objects.get(
                    employee_number=content["sales_person"]
                ),
                "automobile": AutomobileVO.objects.create(
                    **{"vin": content["automobile"]}
                ),
                "customer": Customer.objects.get(customer_name=content["customer"]),
            }
        except ValueError as e:
            response = JsonResponse({"message": "Sales Record cannot be created"})
            response.status_code = 400
            return response

        sales = Sales.objects.create(**content)
        return JsonResponse(sales, encoder=SalesListEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):

    # GET REQUEST
    if request.method == "GET":
        sales_reps = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_reps},
            encoder=SalesPersonDetailEncoder,
        )

    # POST REQUEST
    else:
        content = json.loads(request.body)

    sales_rep = SalesPerson.objects.create(**content)
    return JsonResponse(
        sales_rep,
        encoder=SalesPersonDetailEncoder,
        safe=False,
    )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):

    # GET REQUEST
    if request.method == "GET":
        sales_customers = Customer.objects.all()
        return JsonResponse({"customers": sales_customers}, encoder=CustomerListEncoder)

    # POST REQUEST
    else:
        content = json.loads(request.body)

        sales_customer = Customer.objects.create(**content)
        return JsonResponse(
            sales_customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )
