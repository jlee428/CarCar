from django.contrib import admin

from .models import Sales, AutomobileVO, SalesPerson, Customer


@admin.register(Sales)
class SalesAdmin(admin.ModelAdmin):
    pass


@admin.register(AutomobileVO)
class BinVOAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass
