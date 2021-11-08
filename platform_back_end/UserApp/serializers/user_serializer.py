from rest_framework import serializers;
from ..models import User;

class UserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User;
        fields = ('email',
                  'password',
                  'name',
                  'department',
                  'role',
                  'is_superuser',
                  'created_at',
                  'user_id');