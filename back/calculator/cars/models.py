from django.db import models

# Create your models here.
class Brand(models.Model):
    Nazvanie_brand = models.CharField(max_length=255)


class Model(models.Model):
    Nazvanie_modeli = models.CharField(max_length=255)
    Nazvanie_marki = models.CharField(max_length=255)