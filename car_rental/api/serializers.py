from rest_framework import serializers
from .models import Branch, Employee

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('id', 'province', 'city', 'postalcode', 'streetnumber', 'streetname', 'unitnumber')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'salt', 'rank', 'DOB', 'province', 'city', 'postal_code', 'street_number', 'unit_number')