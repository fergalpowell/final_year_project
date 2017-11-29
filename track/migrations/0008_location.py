# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-29 22:25
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('track', '0007_journey'),
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current_location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('home_location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('work_location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
            ],
        ),
    ]
