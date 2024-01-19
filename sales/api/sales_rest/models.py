from django.db import models

# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class SalesPerson(models.Model):
    sales_person_name = models.CharField(max_length=100)
    employee_number = models.IntegerField()

    def __str__(self):
        return self.sales_person_name


class Customer(models.Model):
    customer_name = models.CharField(max_length=100)
    customer_address = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=20)

    def __str__(self):
        return self.customer_name


class Sales(models.Model):
    automobile = models.OneToOneField(
        AutomobileVO, related_name="sales", on_delete=models.PROTECT, null=True
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer, related_name="sales", on_delete=models.PROTECT, null=True
    )
    sale_price = models.IntegerField()

    def __str__(self):
        return (
            self.sales_person.sales_person_name
            + " "
            + str(self.sales_person.employee_number)
        )
