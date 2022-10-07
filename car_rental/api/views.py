from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import Branch_Phone_NumberSerializer, Branch_Phone_NumberSerializer, BranchSerializer, EmployeeSerializer, CustomerSerializer
from .models import Branch, Branch_Phone_Number, Employee, Customer

# Create your views here.

class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()

class Branch_Phone_NumberView(viewsets.ModelViewSet):
    serializer_class = Branch_Phone_NumberSerializer
    queryset = Branch_Phone_Number.objects.all()

class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
