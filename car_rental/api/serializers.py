from cgi import MiniFieldStorage
from rest_framework import serializers
from .models import Branch, Car, CarType

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('id', 'province', 'city', 'postalcode', 'streetnumber', 'streetname', 'unitnumber')

class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ('car_type_id', 'description', 'daily_cost', 'weekly_cost', 'monthly_cost', 'late_fee', 'change_branch_fee')

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('car_id', 'car_type', 'branch', 'manufacturer', 'model', 'fuel_type', 'colour', 'license_plate', 'status', 'mileage')
