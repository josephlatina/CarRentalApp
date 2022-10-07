from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import BranchSerializer, EmployeeSerializer, CustomerSerializer
from .models import Branch, Employee, Customer

# Create your views here.

class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()

class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
