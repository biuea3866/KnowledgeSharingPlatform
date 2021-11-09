import datetime
from rest_framework import serializers;
from ..models import User;

import bcrypt;

class RegisterSerializer(serializers.ModelSerializer) :
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
    
    def create(self, validated_data) :
        instance = self.Meta.model(**validated_data);

        # set password encrypted
        password = validated_data.pop('password', None);
        
        if password is not None :
            instance.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8');

        # set created_at
        instance.created_at = datetime.date.today();
        print(instance.is_active);

        instance.save();
        
        return instance;