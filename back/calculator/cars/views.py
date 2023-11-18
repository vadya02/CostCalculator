import json
from bs4 import BeautifulSoup
from django.shortcuts import render
import requests
from rest_framework import generics, status
from .models import Brand, Model, RequestedCar, Region, Modification, Tax, Statistic, CarDescription
from .serializers import BrandSerializer, ModelSerializer, TaxSerializer, RegionSerializer, RequestedCarSerializer, ModificationSerializer, StatisticSerializer, FloatNumberSerializer,CarDescriptionSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from django.shortcuts import get_object_or_404

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_text
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotFound
from cars.models import Brand, Model

# from djoser.views import ActivationView as DjoserActivationView
# from django.shortcuts import redirect
# from .serializers import UserRegistrationSerializer
# from djoser.views import UserCreateView

# class CustomUserCreateView(UserCreateView):
#     pass


# class CustomActivationView(DjoserActivationView):
#     def get(self, request, *args, **kwargs):
#         # Выполните код для подтверждения email
#         return redirect('your_success_redirect_url')

User = get_user_model()

# class ConfirmEmailView(generics.GenericAPIView):
#     def get(self, request, *args, **kwargs):
#         try:
#             uid = str(urlsafe_base64_decode(self.kwargs['token']))
#             user = User.objects.get(pk=uid)
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#             raise NotFound('Пользователь не найден')

#         if user.token_generator.check_token(user, self.kwargs['token']):
#             user.email_confirmed = True
#             user.save()
#             return Response({'message': 'Email успешно подтвержден'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'message': 'Неверная ссылка для подтверждения email'}, status=status.HTTP_400_BAD_REQUEST)


# class UserRegistrationView(generics.CreateAPIView):
#     serializer_class = UserRegistrationSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()

#         # Отправка письма с подтверждающей ссылкой
#         token = user.token_generator.make_token(user)
#         confirm_url = reverse('confirm-email', kwargs={'token': token})
#         confirm_link = f'{settings.FRONTEND_URL}{confirm_url}'
#         send_mail(
#             'Подтвердите ваш email',
#             f'Для подтверждения email, перейдите по ссылке: {confirm_link}',
#             settings.EMAIL_FROM,
#             [user.email],
#             fail_silently=False,
#         )

#         return Response(
#             {'user_id': user.id, 'username': user.username, 'email': user.email},
#             status=status.HTTP_201_CREATED
#         )


class BrandList(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    # def get_queryset(self):
    #     user = self.request.data.get('token')
    #     print(user)
    #     self.request.car_request_data = {
    #         'user': user,
    #     }
class RegionList(generics.ListCreateAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

class BrandDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class ModelList(generics.ListCreateAPIView):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer

class ModelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer

class TaxList(generics.ListCreateAPIView):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer

class TaxDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer




class ModelsByBrandView(generics.ListAPIView):
    serializer_class = ModelSerializer

    def get_queryset(self):
        
        brand_name = self.request.query_params.get('Nazvanie_marki', None)
        self.request.car_request_data = {
            
            'brand': brand_name,
        }
        if brand_name is not None:
            print(brand_name)
            return Model.objects.filter(Nazvanie_marki__Nazvanie_brand=brand_name)
            
        else:
            return Model.objects.none()
        
class ModificationByModelView(generics.ListAPIView):
    serializer_class = ModificationSerializer
    
    def get_queryset(self):
        modification_name = self.request.query_params.get('Nazvanie_modeli', None)
        self.request.car_request_data = {
            'model': modification_name,

        }
        if modification_name is not None:
            print(modification_name)
            return Modification.objects.filter(Nazvanie_modeli_fk__Nazvanie_modeli=modification_name)
            
        else:
            return Modification.objects.none()
        




@api_view(['GET'])  # Указываете методы, которые разрешены
@permission_classes([AllowAny])  
class BrandView(generics.ListAPIView):
    serializer_class = ModelSerializer
    queryset = Brand.objects.all()

from djoser.views import UserViewSet
from rest_framework.response import Response
 
class ActivateUser(UserViewSet):
    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        print("Hello")
        # this line is the only change from the base implementation.
        kwargs['data'] = {"uid": self.kwargs['uid'], "token": self.kwargs['token']}
 
        return serializer_class(*args, **kwargs)
 
    def activation(self, request, uid, token, *args, **kwargs):
        print("Hello")
        super().activation(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class CountSumView(generics.ListAPIView):
    serializer_class = FloatNumberSerializer
    
    def get(self, format=None):
        # Отбор мощности по id модификации
        modification_id = int(self.request.query_params.get('Modification'))
        modification_name = Modification.objects.get(id=modification_id)
        modification_power= modification_name.Power
        print(modification_power)
        modification_capacity = modification_name.Capacity_of_engine
        print(modification_capacity)
        # self.request.car_request_data = {
        #     'power': modification_power,
        #     'capacity': modification_capacity,
        # }

        # power = float(self.request.query_params.get('Power', None))
        region = self.request.query_params.get('Region', None)
        print('регион: '+ region)
        region_object = Region.objects.get(id=region)
        print (region_object)
        region_name = region_object.Nazvanie_regiona
        print ('Название региона: ' + region_name)
        probeg = float(self.request.query_params.get('Probeg', None))      
        print(probeg)  
        rashod = float(self.request.query_params.get('Rashod_topliva', None))
        print(rashod)
        cost_of_fuel = float(self.request.query_params.get('Cost_of_fuel', None))
        print(cost_of_fuel)
        # tax_rate = Tax.objects.get(Nazvanie_regiona_fk__Nazvanie_regiona=region, Min_power__lte=power, Max_power__gte=power)
        tax_rate = Tax.objects.get(Nazvanie_regiona_fk_id=region, Min_power__lte=modification_power, Max_power__gte=modification_power)
        tax = tax_rate.Nalog
        print(tax)
        sumOfCarship = tax*modification_power + (probeg/100) * rashod * cost_of_fuel
        # sumOfCarship = tax*power + (probeg/100) * rashod * cost_of_fuel
        car_request_data = getattr(self.request, 'car_request_data', None)
        
        # Получение данных из запроса
        # modification_id = int(self.request.query_params.get('modification_id', None))
        
        # Получение модификации по id
        modification = get_object_or_404(Modification, id=modification_id)
        print(modification)
        # Получение марки и модели
        
        model = modification.Nazvanie_modeli_fk.Nazvanie_modeli
        brand = modification.Nazvanie_modeli_fk.Nazvanie_marki.Nazvanie_brand
        print(model)
        print(brand)

        obj, created = RequestedCar.objects.get_or_create(
            user=self.request.user,
            # modification=modification,
            # rashod_topliva=rashod,
            # probeg=probeg,
            # cost_of_fuel=cost_of_fuel,
            car_name = brand,
            car_model = model,
            modification_power = modification_power,
            modification_capacity = modification_capacity,
            cost_of_ownership = sumOfCarship,
            cost_of_fuel = cost_of_fuel,
            region = region, 
            region_name = region_name,
            probeg = probeg, 
            rashod = rashod, 
            modification_name = modification_id,
            sum_of_nalog = tax*modification_power,
            sum_of_fuel = (probeg/100) * rashod * cost_of_fuel

        )
        if (created==False):
            obj.kolichestvo_zaprosov = obj.kolichestvo_zaprosov+1
            obj.save()
        
        statistic, created = Statistic.objects.get_or_create(brand = brand, model_name = model)
        print('Статистика: ' + statistic.model_name)
        if (created==False):
            statistic.num_requests = statistic.num_requests+1
            statistic.save()
        return Response({'sum_of_carship': sumOfCarship, 'toplivo': (probeg/100) * rashod * cost_of_fuel, 'nalog': tax*modification_power})
            
        # else:
        #     return Response({'error': 'error'})

class RequestedCarView(generics.ListCreateAPIView):
    serializer_class = RequestedCarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return RequestedCar.objects.filter(user=user)
    

class CarRequestStatisticView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        statistics = Statistic.objects.all()
        data = [{'Marka': stat.brand.__str__(), 'Model': stat.model_name, 'Kolichestvo_zaprosov': stat.num_requests} for stat in statistics]
        return Response(data)
        # user = self.request.user
        # print (user)
        # return Statistic.objects.filter(user=user)

class CarDescriptionView(generics.ListAPIView):
    serializer_class = CarDescriptionSerializer

    # def get_queryset(self):
    #     # Получите ключ (марку автомобиля) из параметров запроса
    #     model_name = self.kwargs['Nazvanie_modeli']
    #     # Фильтруйте модели по марке
    #     queryset = CarDescription.objects.filter(model=model_name)
    #     return queryset

    def get_queryset(self):
        
        model_name = self.request.query_params.get('Nazvanie_modeli', None)
        self.request.car_request_data = {
            
            'CarDescripiton': model_name,
        }
        if model_name is not None:
            print(model_name)
            return CarDescription.objects.filter(model__Nazvanie_modeli=model_name)
            
        else:
            return CarDescription.objects.none()
            


class CarDescriptionListView(generics.ListCreateAPIView):
    
    queryset = CarDescription.objects.all()
    serializer_class = CarDescriptionSerializer


class ParcingView(generics.ListCreateAPIView):
    def get(self, request):
        # URL веб-сайта для парсинга
        url = 'https://auto.drom.ru/toyota/camry/generation9/restyling1/'

        # Отправка GET-запроса к странице
        response = requests.get(url)

        # Проверка успешности запроса
        if response.status_code == 200:
            # Использование BeautifulSoup для анализа HTML-кода страницы
            soup = BeautifulSoup(response.text, 'html.parser')
            price_spans= soup.find_all('span', attrs={'data-ftid': "bull_price"})
            # Пример: Извлечение заголовков всех объявлений с использованием селекторов
            titles = soup.select('.item-title')
            for price_span in price_spans:
                print(f"Найденная цена: {price_span.text}")
            data = [price_span.text for price_span in price_spans]
            print(data)
            return Response(data)
        else:
            return Response({'error': f"Ошибка {response.status_code}. Невозможно получить доступ к странице."})