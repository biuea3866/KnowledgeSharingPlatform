from django.db import models

class Comment(models.Model) :
    content = models.CharField(max_length=255);

    name = models.CharField(max_length=255);

    created_at = models.DateTimeField(auto_now_add=True);

    is_secret = models.BooleanField(default=False);

    post_id = models.CharField(max_length=255);