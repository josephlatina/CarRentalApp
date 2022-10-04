from django.db import models

# Create your models here.
class Branch(models.Model):
    id = models.AutoField(primary_key=True)
    province = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    postalcode = models.CharField(max_length=6)
    streetnumber = models.CharField(max_length=10)
    streetname = models.CharField(max_length=30)
    unitnumber = models.CharField(max_length=5)