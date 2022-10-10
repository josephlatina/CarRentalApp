from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from .models import Branch, BranchPhoneNumber, Customer, CustomerPhoneNumber, Employee, EmployeePhoneNumber, Car, CarType, Rental

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ('rental_id', 'date_from', 'date_to', 'date_returned', 'total_cost','licence_plate','gold_member')

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('id', 'province', 'city', 'postalcode',
                  'streetnumber', 'streetname', 'unitnumber')
                  
class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ('car_type_id', 'description', 'daily_cost', 'weekly_cost', 'monthly_cost', 'late_fee', 'change_branch_fee')

class BranchPhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchPhoneNumber
        fields = ('id', 'branch_id', 'phone_number')

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('car_id', 'car_type', 'branch', 'manufacturer', 'model', 'fuel_type', 'colour', 'license_plate', 'status', 'mileage')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'salt', 'salary', 'rank', 'DOB',
                  'province', 'city', 'postal_code', 'street_number', 'street_name', 'unit_number')


class EmployeePhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeePhoneNumber
        fields = ('id', 'employee_id', 'phone_number')


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'first_name', 'last_name', 'drivers_license', 'email', 'DOB', 'gold_member',
                  'province', 'city', 'postal_code', 'street_number', 'street_name', 'unit_number')

class CustomerPhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerPhoneNumber
        fields = ('id', 'customer_id', 'phone_number')