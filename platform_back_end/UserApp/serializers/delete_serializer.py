from rest_framework import serializers

from ..models import User;

class DeleteSerializer(serializers.Serializer) :
    is_active = serializers.BooleanField();
    user_id = serializers.CharField();
    
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
        if(validated_data['is_active'] is False) :
            instance.is_active = validated_data.get('is_active', instance.is_active);
        
        instance.save();

        return instance;