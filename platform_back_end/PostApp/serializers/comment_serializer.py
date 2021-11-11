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
        return Comment.objects.create(**validated_data);