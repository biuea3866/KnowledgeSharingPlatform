from rest_framework import serializers;

from ..models.tag_model import Tag;

class TagsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Tag;
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