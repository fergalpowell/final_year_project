# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-14 20:01
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('track', '0008_location'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Journey',
        ),
        migrations.DeleteModel(
            name='Location',
        ),
    ]
