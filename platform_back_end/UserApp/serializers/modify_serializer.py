from rest_framework import serializers;
from ..models import User;

import bcrypt;

class ModifySerializer(serializers.ModelSerializer) :
    class Meta :
        model = User;
        fields = ('email',
                  'password',
                  'nickname',
                  'name',
                  'department',
                  'role',
                  'is_superuser',
                  'created_at',
                  'user_id');
    
    def update(self, instance, validated_data) :
        instance.password = bcrypt.hashpw(validated_data.get('password', instance.password).encode('utf-8'), bcrypt.gensalt());
        instance.nickname = validated_data.get('nickname', instance.nickname);
        
        instance.save();

        return instance;