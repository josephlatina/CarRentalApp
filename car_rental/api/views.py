from django.shortcuts import render
from rest_framework import generics, viewsets

from .serializers import BranchSerializer, BranchPhoneNumberSerializer, EmployeePhoneNumberSerializer, EmployeeSerializer, CustomerSerializer, CustomerPhoneNumberSerializer, CarSerializer, CarTypeSerializer, RentalSerializer
from .models import Branch, BranchPhoneNumber, Employee, Customer, CustomerPhoneNumber, EmployeePhoneNumber, Car, CarType, Rental

# Create your views here.


class RentalView(viewsets.ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()


class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()


class BranchPhoneNumberView(viewsets.ModelViewSet):
    serializer_class = BranchPhoneNumberSerializer
    queryset = BranchPhoneNumber.objects.all()


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


class CustomerPhoneNumberView(viewsets.ModelViewSet):
    serializer_class = CustomerPhoneNumberSerializer
    queryset = CustomerPhoneNumber.objects.all()
