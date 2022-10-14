from tkinter import CASCADE
from unittest.mock import DEFAULT
from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.


class Branch(models.Model):
    id = models.AutoField(primary_key=True)
    province = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    postal_code = models.CharField(max_length=6)
    street_number = models.CharField(max_length=10)
    street_name = models.CharField(max_length=30)
    unit_number = models.CharField(max_length=5)


class BranchPhoneNumber(models.Model):
    id = models.AutoField(primary_key=True)
    branch_id = models.ForeignKey('Branch', on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)


class CarType(models.Model):
    car_type_id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=50)
    daily_cost = models.FloatField(max_length=10)
    weekly_cost = models.FloatField(max_length=10)
    monthly_cost = models.FloatField(max_length=10)
    late_fee = models.FloatField(max_length=10)
    change_branch_fee = models.FloatField(max_length=10)

    def __str__(self):
        return self.description


class Car(models.Model):
    # choices for status
    STATUS_CHOICES = (('Available', 'Rented'), ('Not Available', 'Not Rented'))

    car_id = models.AutoField(primary_key=True)
    car_type = models.ForeignKey(CarType, related_name='car_type', on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, related_name='car_branch', default='', on_delete=models.CASCADE)
    manufacturer = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    fuel_type = models.CharField(max_length=15)
    colour = models.CharField(max_length=15)
    license_plate = models.CharField(max_length=10)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    mileage = models.FloatField(max_length=25)

    def __str__(self):
        return self.manufacturer + self.model


class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    # Password and number will now temporarily be chars. Might need to hash them later
    password = models.CharField(max_length=255)
    salt = models.CharField(max_length=255)
    salary = models.IntegerField()
    rank = models.CharField(max_length=30)
    DOB = models.DateField()
    province = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    postal_code = models.CharField(max_length=6)
    street_number = models.CharField(max_length=10)
    street_name = models.CharField(max_length=30)
    unit_number = models.CharField(max_length=5)
    works_at = models.ForeignKey(Branch, models.DO_NOTHING)


class EmployeePhoneNumber(models.Model):
    id = models.AutoField(primary_key=True)
    employee_id = models.ForeignKey(Employee, models.DO_NOTHING)
    phone_number = models.CharField(max_length=15)


class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    drivers_license = models.CharField(max_length=30)
    email = models.EmailField(max_length=200)
    DOB = models.DateField()
    gold_member = models.BooleanField()
    province = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    postal_code = models.CharField(max_length=6)
    street_number = models.CharField(max_length=10)
    street_name = models.CharField(max_length=30)
    unit_number = models.CharField(max_length=5)


class CustomerPhoneNumber(models.Model):
    id = models.AutoField(primary_key=True)
    customer_id = models.ForeignKey(Customer, models.DO_NOTHING)
    phone_number = models.CharField(max_length=15)


class Rental(models.Model):
    rental_id = models.AutoField(primary_key=True)
    date_from = models.DateField()
    date_to = models.DateField()
    date_returned = models.DateField()
    total_cost = models.FloatField(max_length=10)
    licence_plate = models.ForeignKey(Car, models.DO_NOTHING)
    gold_member = models.ForeignKey(Customer, models.DO_NOTHING)
