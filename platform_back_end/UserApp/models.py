from django.db import models
from django.contrib.auth.models import AbstractBaseUser;

class User(AbstractBaseUser) :
    email = models.CharField(max_length=255, 
                             unique=True);

    password = models.CharField(max_length=255,
                                null=True);

    nickname = models.CharField(max_length=255,
                                null=True,
                                unique=True);
    
    name = models.CharField(max_length=255);

    department = models.CharField(max_length=255);

    role = models.CharField(max_length=255,
                            default="USER");

    created_at = models.DateField(auto_now_add=True);

    is_active = models.BooleanField(default=True);
    
    user_id = models.CharField(max_length=150,
                               primary_key=True,
                               default=None);

    REQUIRED_FIELDS = [];
    USERNAME_FIELD = 'email';