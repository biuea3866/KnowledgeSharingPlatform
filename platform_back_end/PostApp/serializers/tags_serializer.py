from rest_framework import serializers;

from ..models.tag_model import Tag;

class TagsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Tag;
        fields = ('tag',
                  'post_id');