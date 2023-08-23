from django.contrib import admin

# Register your models here.
from .models import Brand, Model,  RequestedCar, Region, Modification, Tax, Statistic

admin.site.register(Brand)
admin.site.register(Model)
admin.site.register(RequestedCar)
admin.site.register(Region)
admin.site.register(Modification)
admin.site.register(Tax)
admin.site.register(Statistic)

