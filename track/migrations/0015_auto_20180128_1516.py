# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-28 15:16
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('track', '0014_geofence_journey_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='geofence',
            name='user',
        ),
        migrations.RemoveField(
            model_name='journey',
            name='user',
        ),
        migrations.RemoveField(
            model_name='location',
            name='user',
        ),
    ]
