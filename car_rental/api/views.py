from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import BranchSerializer
from .models import Branch

# Create your views here.

class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()
