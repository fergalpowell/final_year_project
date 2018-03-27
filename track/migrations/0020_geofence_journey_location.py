# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-28 19:34
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profile', '0013_auto_20180128_1713'),
        ('track', '0019_auto_20180128_1932'),
    ]

    operations = [
        migrations.CreateModel(
            name='Geofence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('coordinates', django.contrib.gis.db.models.fields.PolygonField(blank=True, null=True, srid=4326)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profile.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Journey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('route', django.contrib.gis.db.models.fields.LineStringField(blank=True, null=True, srid=4326)),
                ('distance', models.FloatField(blank=True, null=True)),
                ('highest_elevation', models.FloatField(blank=True, null=True)),
                ('lowest_elevation', models.FloatField(blank=True, null=True)),
                ('top_speed', models.FloatField(blank=True, null=True)),
                ('duration', models.TimeField(blank=True, null=True)),
                ('saved_journey', models.BooleanField()),
                ('outside_geofence', models.BooleanField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profile.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current_location', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
                ('home_location', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
                ('work_location', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profile.Profile')),
            ],
        ),
    ]