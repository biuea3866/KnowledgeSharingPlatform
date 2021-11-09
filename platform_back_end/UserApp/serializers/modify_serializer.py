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
                  'is_active',
                  'created_at',
                  'user_id');
    
    def update(self, instance, validated_data) :
        if(validated_data['password'] is not None) :
            instance.password = bcrypt.hashpw(validated_data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8');
            
        if(validated_data['nickname'] is not None) :
            instance.nickname = validated_data.get('nickname', instance.nickname);
            
        instance.save();

        return instance;