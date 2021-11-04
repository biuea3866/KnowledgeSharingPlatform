from django.db import models

class User(models.Model) :
    email = models.CharField(max_length=500, unique=True);
    encryptedPassword = models.CharField(max_length=500);
    name = models.CharField(max_length=500);
    department = models.CharField(max_length=500);
    role = models.CharField(max_length=500);

    userId = models.AutoField(primary_key=True);