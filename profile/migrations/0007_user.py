# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-14 20:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profile', '0006_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serial_number', models.IntegerField()),
                ('name', models.CharField(max_length=250)),
                ('email', models.CharField(max_length=250)),
                ('bike_image_ref', models.CharField(max_length=250)),
                ('bike_model', models.CharField(max_length=250)),
                ('bike_colour', models.CharField(max_length=250)),
            ],
        ),
    ]
