import datetime
import bcrypt
from django.http.response import JsonResponse
import jwt
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed;
from ..models import User;

import re;

class LoginSerializer(serializers.ModelSerializer) :
    email = serializers.CharField();
    password = serializers.CharField();

    class Meta :
        model = User;
        fields = ('email',
                  'password');     