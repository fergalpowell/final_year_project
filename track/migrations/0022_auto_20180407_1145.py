# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-04-07 11:45
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('track', '0021_locationdata'),
    ]

    operations = [
        migrations.AddField(
            model_name='journey',
            name='date_time',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2018, 4, 7, 11, 45, 17, 819651)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='journey',
            name='finished',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]
