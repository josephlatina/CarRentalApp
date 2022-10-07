from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import BranchPhoneNumberSerializer, BranchPhoneNumberSerializer, BranchSerializer, EmployeeSerializer, CustomerSerializer
from .models import Branch, BranchPhoneNumber, Employee, Customer

# Create your views here.

class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()

class BranchPhoneNumberView(viewsets.ModelViewSet):
    serializer_class = BranchPhoneNumberSerializer
    queryset = BranchPhoneNumber.objects.all()

class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
