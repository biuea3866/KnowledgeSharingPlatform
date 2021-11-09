from django.db import models
from django.contrib.auth.models import AbstractBaseUser;

import uuid;

class User(AbstractBaseUser) :
    email = models.CharField(max_length=255, 
                             unique=True);

    password = models.CharField(max_length=255,
                                null=True);

    nickname = models.CharField(max_length=255,
                                null=True);
    
    name = models.CharField(max_length=255);

    department = models.CharField(max_length=255);

    role = models.CharField(max_length=255,
                            default="USER");

    created_at = models.DateField();

    is_active = models.BooleanField(default=True);
    
    user_id = models.CharField(primary_key=True,
                               default=uuid.uuid4(),
                               max_length=150);

    REQUIRED_FIELDS = [];
    USERNAME_FIELD = 'email';