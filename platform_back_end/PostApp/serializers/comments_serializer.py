from rest_framework import serializers;

from ..models.comment_model import Comment;

class CommentsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Comment;
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