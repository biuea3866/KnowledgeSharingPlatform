from rest_framework import serializers;
from ..models import User;

class UsersSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User;
        fields = ('email',
                  'password',
                  'nickname',
                  'name',
                  'department',
                  'role',
                  'is_active',
                  'created_at',
                  'user_id');