# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.gis.db import models


class Geofence(models.Model):
    user = models.ForeignKey('profile.Profile', on_delete=models.CASCADE)
    name = models.CharField(max_length=250, null=True, blank=True)
    coordinates = models.PolygonField(null=True, blank=True)


class Journey(models.Model):
    user = models.ForeignKey('profile.Profile', on_delete=models.CASCADE)
    route = models.LineStringField(null=True, blank=True)
    distance = models.FloatField(null=True, blank=True)
    highest_elevation = models.FloatField(null=True, blank=True)
    lowest_elevation = models.FloatField(null=True, blank=True)
    top_speed = models.FloatField(null=True, blank=True)
    duration = models.TimeField(null=True, blank=True)
    saved_journey = models.BooleanField(blank=True)
    outside_geofence = models.BooleanField(blank=True)
    finished = models.BooleanField(blank=True)
    date_time = models.DateTimeField(blank=True)


class Location(models.Model):
    user = models.ForeignKey('profile.Profile', on_delete=models.CASCADE)
    current_location = models.PointField(null=True, blank=True)
    home_location = models.PointField(null=True, blank=True)
    work_location = models.PointField(null=True, blank=True)
    date_time = models.DateTimeField(blank=True)


class LocationData(models.Model):
    user = models.ForeignKey('profile.Profile', on_delete=models.CASCADE)
    location = models.PointField(null=True, blank=True)
    speed = models.FloatField(null=True, blank=True)
    date_time = models.DateTimeField(null=True, blank=True)



