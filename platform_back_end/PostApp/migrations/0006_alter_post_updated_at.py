# Generated by Django 3.2.9 on 2021-11-30 02:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PostApp', '0005_alter_post_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 11, 30, 2, 18, 18, 620067)),
        ),
    ]
