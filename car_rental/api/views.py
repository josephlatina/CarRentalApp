from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import BranchSerializer, EmployeeSerializer
from .models import Branch, Employee

# Create your views here.

class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()

class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
