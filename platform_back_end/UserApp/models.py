from django.db import models
from django.contrib.auth.models import AbstractUser;

class User(AbstractUser) :
    email = models.CharField(max_length=255, 
                             unique=True);

    password = models.CharField(max_length=255);

    name = models.CharField(max_length=255);

    department = models.CharField(max_length=255);

    role = models.CharField(max_length=255);

    is_superuser = models.BooleanField(default=False);

    created_at = models.DateField(auto_now_add=True);

    user_id = models.CharField(primary_key=True,
                               max_length=150);

    REQUIRED_FIELDS = [];
    USERNAME_FIELD = 'email';