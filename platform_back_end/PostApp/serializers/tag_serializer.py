from rest_framework import serializers;

from ..models.tag_model import Tag;

class TagSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Tag;
        fields = ('tag',
                  'post_id');

    def create(self, validated_data) :
        instance = self.Meta.model(**validated_data);

        instance.save();

        return instance;
