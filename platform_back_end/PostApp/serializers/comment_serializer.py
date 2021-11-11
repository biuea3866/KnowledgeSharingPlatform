from rest_framework import serializers;

import datetime;

from ..models.comment_model import Comment;

class CommentSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Comment;
        fields = ('content',
                  'name',
                  'is_secret',
                  'post_id');

    def create(self, validated_data) :
        instance = self.Meta.model(**validated_data);

        instance.save();

        return instance;