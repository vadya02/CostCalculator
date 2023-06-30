from django.contrib import admin

# Register your models here.
from .models import Brand, Model

admin.site.register(Brand)
admin.site.register(Model)