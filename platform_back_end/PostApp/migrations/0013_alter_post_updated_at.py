# Generated by Django 3.2.9 on 2021-12-01 23:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PostApp', '0012_alter_post_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 1, 23, 58, 29, 912298)),
        ),
    ]