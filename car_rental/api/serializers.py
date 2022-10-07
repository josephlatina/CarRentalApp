from dataclasses import field
from rest_framework import serializers
from .models import Branch, BranchPhoneNumber, Customer, Employee


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('id', 'province', 'city', 'postalcode',
                  'streetnumber', 'streetname', 'unitnumber')

class BranchPhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchPhoneNumber
        fields = ('id', 'branch_id', 'phone_number')


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'salt', 'salary', 'rank', 'DOB',
                  'province', 'city', 'postal_code', 'street_number', 'street_name', 'unit_number')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'first_name', 'last_name', 'drivers_license', 'email', 'DOB', 'gold_member',
                  'province', 'city', 'postal_code', 'street_number', 'street_name', 'unit_number')