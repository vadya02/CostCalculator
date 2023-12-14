from rest_framework import serializers
from .models import Brand, Model, Tax, Region, RequestedCar, Modification, Statistic, CarDescription
from django.contrib.auth import get_user_model
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'
class CarDescriptionSerializer(serializers.ModelSerializer):
    model_name = serializers.CharField(source='model.Nazvanie_modeli', read_only=True)
    marka_name = serializers.CharField(source='model.Nazvanie_marki.Nazvanie_brand', read_only=True)
    class Meta:
        model = CarDescription
        fields = '__all__'
class RequestedCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestedCar
        fields = '__all__'

class ModificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modification
        fields = '__all__'

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = '__all__'

class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        fields = '__all__'
class FloatNumberSerializer(serializers.Serializer):
    float_number = serializers.FloatField()
User = get_user_model()

# class CustomUserCreateSerializer(UserCreateSerializer):
#     class Meta(UserCreateSerializer.Meta):
#         model = User
#         fields = ('id', 'email', 'username', 'password')