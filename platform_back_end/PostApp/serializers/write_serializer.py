import datetime;
import uuid;

from rest_framework import serializers;

from ..models.post_model import Post;

class WriteSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Post;
        fields=('title',
                'contents',
                'is_secret',
                'user_id')

    def create(self, validated_data) :
        instance = self.Meta.model(**validated_data);

        instance.created_at = datetime.datetime.now();

        instance.post_id = uuid.uuid4();

        instance.save();

        return instance;
