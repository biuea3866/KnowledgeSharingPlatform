from django.db import models

class Tag(models.Model) :
    tag = models.CharField(max_length=255,
                           null=True);

    post_id = models.CharField(max_length=255);