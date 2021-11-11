from django.db import models

class Post(models.Model) :
    title = models.CharField(max_length=255, 
                             null=True);

    contents = models.TextField(null=True);

    comments = models.JSONField(default=list);

    tags = models.JSONField(default=list);

    created_at = models.DateTimeField(auto_now_add=True);

    updated_at = models.DateTimeField(auto_now=True);

    update_count = models.IntegerField(default=0);

    is_secret = models.BooleanField(default=False);
    
    user_id = models.CharField(max_length=150);

    post_id = models.CharField(max_length=150,
                               primary_key=True,
                               default=None);