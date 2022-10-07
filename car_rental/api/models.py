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

class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    drivers_license = models.CharField(max_length=30)
    email = models.EmailField(max_length = 200)
    DOB = models.DateField()
    gold_member = models.BooleanField()
    province = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    postal_code = models.CharField(max_length=6)
    street_number = models.CharField(max_length=10)
    street_name = models.CharField(max_length=30)
    unit_number = models.CharField(max_length=5)

