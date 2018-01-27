# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.gis.db import models
from profile.models import UserInfo


class Geofence(models.Model):
    user = models.ForeignKey(UserInfo)
    name = models.CharField(max_length=250)
    coordinates = models.PolygonField()


class Journey(models.Model):
    user = models.ForeignKey(UserInfo)
    route = models.LineStringField()
    distance = models.FloatField()
    highest_elevation = models.FloatField()
    lowest_elevation = models.FloatField()
    top_speed = models.FloatField()
    duration = models.TimeField()
    saved_journey = models.BooleanField()
    outside_geofence = models.BooleanField()


class Location(models.Model):
    user = models.ForeignKey(UserInfo)
    current_location = models.PointField(null=True, blank=True)
    home_location = models.PointField(null=True, blank=True)
    work_location = models.PointField(null=True, blank=True)


