from rest_framework import serializers;

from ..models.comment_model import Comment;

class CommentsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Comment;
        fields = ('content',
                  'name',
                  'is_secret',
                  'post_id',
                  'created_at');