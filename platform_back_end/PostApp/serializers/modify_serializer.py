from rest_framework import serializers;

from ..models.post_model import Post;

import datetime;

class ModifySerializer(serializers.ModelSerializer) :
    class Meta :
        model = Post;
        fields = ('title',
                  'contents',
                  'comments',
                  'tags',
                  'created_at',
                  'updated_at',
                  'update_count',
                  'is_secret',
                  'user_id');

    def update(self, instance, validated_data) :
        instance.comments = validated_data.get('comments', instance.comments);
        instance.tags = validated_data.get('tags', instance.tags);
        
        instance.save();

        return instance;
