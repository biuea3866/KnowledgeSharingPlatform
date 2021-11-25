from rest_framework import serializers

from ..models import User;

class ResurrectSerializer(serializers.Serializer) :
    is_active = serializers.BooleanField();
    user_id = serializers.CharField();
    
    class Meta :
        model = User;
        fields = ('is_active',
                  'user_id');

    def update(self, instance, validated_data) :
        instance.is_active = validated_data.get('is_active', True);
        
        instance.save();

        return instance;