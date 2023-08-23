"""
URL configuration for calculator project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path
# # from .views import ModelList, ModelDetail

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # path('products/', ModelList.as_view(), name='product-list'),
#     # path('products/<int:pk>/', ModelDetail.as_view(), name='product-detail'),
 
# ]

from django.contrib import admin
from django.urls import path, include
from  cars.views import BrandDetail, BrandList, ModelsByBrandView, ActivateUser, ModificationByModelView, RegionList, CountSumView, RequestedCarView, CarRequestStatisticView
from djoser import views as djoser_views
# from djoser.views import ActivationView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('products/', BrandList.as_view(), name='product-list'),
    path('products/<int:pk>/', BrandDetail.as_view(), name='product-detail'),
    path('models-by-brand/', ModelsByBrandView.as_view(), name='models-by-brand'),
    path('modification-by-model/', ModificationByModelView.as_view(), name='modification-by-model'),
    path('brands/', BrandList.as_view(), name='brand-list'),
    path('regions/', RegionList.as_view(), name='region-list'),
    path('cost_of_carship/', CountSumView.as_view(), name='cost-of-carship'),
    path('requested_car/', RequestedCarView.as_view(), name='requested-car'),
    path('statistic/', CarRequestStatisticView.as_view(), name='statistic'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    # path('^auth/', include('djoser.urls')),
    # path('api/auth/register/', djoser_views.as_view(), name='djoser-register'),
    # path('api/auth/activate/<str:uid>/<str:token>/', ActivationView.as_view(), name='djoser-activate'),
    # path('activate/<uid>/<token>/', ActivateUser.as_view({'get': 'activation'}), name='activation'),
    # path('api/', include('cars.urls'))
]

