from rest_framework import serializers;

from ..models.post_model import Post;

class SearchSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Post;
        fields=('title',
                'contents',
                'comments',
                'tags',
                'created_at',
                'updated_at',
                'update_count',
                'is_secret',
                'user_id',
                'post_id');