from django.db import models

# Create your models here.
class Visitydata(models.Model):
    name = models.CharField(max_length=255)
    emailaddress = models.CharField(max_length=255)
    mobileno = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'visitydata'