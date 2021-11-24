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
                  'user_id',
                  'post_id');

    def update(self, instance, validated_data) :
        if instance.comments != validated_data['comments'] :
            instance.comments = validated_data.get('comments', instance.comments);
        
        if instance.tags != validated_data['tags'] :
            instance.tags = validated_data.get('tags', instance.tags);
        
        if instance.contents != validated_data['contents'] or instance.title != validated_data['title'] or instance.is_secret != validated_data['is_secret']:
            instance.contents = validated_data.get('contents', instance.contents);
            instance.title = validated_data.get('title', instance.title);
            instance.is_secret = validated_data.get('is_secret', instance.is_secret);
            instance.updated_at = datetime.datetime.now();
            instance.update_count = instance.update_count + 1;

        instance.save();

        return instance;
