# Generated by Django 3.2.9 on 2021-12-06 01:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PostApp', '0028_alter_post_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 6, 1, 59, 24, 339445)),
        ),
    ]
