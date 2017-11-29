# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.gis.db import models


class Journey(models.Model):
    journey_id = models.IntegerField
    serial_number = models.IntegerField
    route = models.LineStringField()
    distance = models.FloatField
    highest_elevation = models.FloatField
    lowest_elevation = models.FloatField
    top_speed = models.FloatField
    duration = models.TimeField
    saved_journey = models.BooleanField
    outside_geofence = models.BooleanField


class Location(models.Model):
    location_id = models.IntegerField
    serial_number = models.IntegerField
    current_location = models.PointField()
    home_location = models.PointField()
    work_location = models.PointField()
