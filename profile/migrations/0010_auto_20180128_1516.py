# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-28 15:16
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('track', '0015_auto_20180128_1516'),
        ('profile', '0009_auto_20180126_1320'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userinfo',
            name='user',
        ),
        migrations.DeleteModel(
            name='UserInfo',
        ),
    ]
