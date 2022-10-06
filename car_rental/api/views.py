from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import BranchSerializer, CarSerializer, CarTypeSerializer
from .models import Branch, Car, CarType

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