from django.shortcuts import render
from rest_framework import generics, viewsets

from .serializers import BranchSerializer, EmployeePhoneNumberSerializer, EmployeeSerializer, CustomerSerializer, CarSerializer, CarTypeSerializer
from .models import Branch, Employee, Customer, EmployeePhoneNumber, Car, CarType

# Create your views here.


class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()


class CarTypeView(viewsets.ModelViewSet):
    serializer_class = CarTypeSerializer
    queryset = CarType.objects.all()


class CarView(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()


class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()


class EmployeePhoneNumberView(viewsets.ModelViewSet):
    serializer_class = EmployeePhoneNumberSerializer
    queryset = EmployeePhoneNumber.objects.all()


class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
