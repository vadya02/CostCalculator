from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import User 
from django.db.models import Avg, Count, Sum
from django.utils import timezone
# Create your models here.
class Brand(models.Model):
    Nazvanie_brand = models.CharField(max_length=255)


class Model(models.Model):
    Nazvanie_modeli = models.CharField(max_length=255)
    Nazvanie_marki = models.ForeignKey(Brand, on_delete=models.CASCADE)

class Modification(models.Model):
    Nazvanie_modeli_fk = models.ForeignKey(Model, on_delete=models.CASCADE)
    Power = models.PositiveIntegerField(default=0)
    Capacity_of_engine = models.DecimalField(max_digits=5, decimal_places=2)  
class Region(models.Model):
    Nazvanie_regiona = models.CharField(max_length=255)

class Tax(models.Model):
    Nalog = models.IntegerField(default=0)
    Nazvanie_regiona_fk = models.ForeignKey(Region, on_delete=models.CASCADE, default=None)
    Min_power = models.IntegerField(default=0)
    Max_power = models.IntegerField(default=0)

class RequestedCar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car_name = models.CharField(max_length=255)
    car_model = models.CharField(max_length=255)
    # modification = models.ForeignKey(Modification, on_delete=models.CASCADE, default=None)
    modification_power = models.FloatField(default=0)
    modification_capacity = models.FloatField(default=0)
    cost_of_ownership = models.FloatField(default=0)
    kolichestvo_zaprosov = models.IntegerField(default=1)
    request_date = models.DateTimeField(default=timezone.now)
    modification_name = models.IntegerField(default=0)
    region = models.IntegerField(default=0)
    region_name = models.CharField(max_length=255, default='')
    probeg = models.FloatField(default=0)
    rashod = models.FloatField(default=0)
    cost_of_fuel = models.FloatField(default=0)
    sum_of_nalog = models.FloatField(default=0)
    sum_of_fuel = models.FloatField(default=0)
    # requested_date = models.DateTimeField(auto_now_add=True)

class Statistic(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    brand = models.CharField(max_length=255, default='')
    num_requests = models.PositiveIntegerField(default=0)
    # average_ownership_cost = models.DecimalField(max_digits=10, decimal_places=2)
    model_name = models.CharField(max_length=255, default='')

class CarDescription(models.Model):
    PRIVOD_CHOICES = [
        ('Полный', 'Полный'),
        ('Передний', 'Передний'),
        ('Задний', 'Задний'),
    ]
    KUZOV_CHOICES = [
        ('Седан', 'Седан'),
        ('Внедорожник', 'Внедорожник'),
        ('Кроссовер', 'Кроссовер'),
    ]
    TOPLIVO_CHOICES = [
        ('Бензин', 'Бензин'),
        ('Дизель', 'Дизель'),

    ]

    privod = models.CharField(
        choices=PRIVOD_CHOICES,
        default=1,  # Значение по умолчанию
    )
    tip_kuzova = models.CharField(
        choices=KUZOV_CHOICES,
        default=1,  # Значение по умолчанию
    )
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # marka = models.ForeignKey(Brand, on_delete=models.CASCADE)
    model = models.ForeignKey(Model, on_delete=models.CASCADE)

    Min_year_of_production = models.IntegerField(default=0)
    Max_year_of_production = models.IntegerField(default=0)
    name_of_car = models.CharField(max_length=255, default='')
    
    # privod = models.CharField(max_length=255, default='')
    # tip_kuzova = models.CharField(max_length=255, default='')
    # toplivo = models.CharField(max_length=255, default='')
    description = models.TextField()
    main_image = models.ImageField(upload_to='car_images/', default='')
    first_image = models.ImageField(upload_to='car_images/', default='')
    second_image = models.ImageField(upload_to='car_images/', default='')
    third_image = models.ImageField(upload_to='car_images/', default='')
    salon_image = models.ImageField(upload_to='car_images/', default='')
    @property
    def marka_name(self): #получение марки авто
        return self.model.Nazvanie_marki.Nazvanie_brand
    @property
    def model_name(self): #получение модели авто
        return self.model.Nazvanie_modeli
        

# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, username, password=None, **extra_fields):
#         if not email:
#             raise ValueError('The Email field must be set')
#         email = self.normalize_email(email)
#         user = self.model(email=email, username=username, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, username, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('Superuser must have is_staff=True.')
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser must have is_superuser=True.')

#         return self.create_user(email, username, password, **extra_fields)

# class CustomUser(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(unique=True)
#     username = models.CharField(max_length=30, unique=True)
#     email_confirmed = models.BooleanField(default=False)

#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = CustomUserManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

#     def __str__(self):
#         return self.email


# class CustomUser(AbstractUser):
#     is_admin = models.BooleanField(default=False)

#     def __str__(self):
#         return self.username