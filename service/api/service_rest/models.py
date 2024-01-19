from django.db import models


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField(null = True)
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f'{self.year} {self.color} VIN:{self.vin}'


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique = True)

    def __str__(self):
        return f'{self.name} #{self.employee_number}'

class Appointment(models.Model):
    vin = models.CharField(max_length= 15)
    owner = models.CharField(max_length= 100)
    date = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.PROTECT)
    reason = models.TextField()
    vip = models.BooleanField(default=False)
    active = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.owner}\'s appointment for {self.reason} on {self.date}'
