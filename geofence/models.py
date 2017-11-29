# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.gis.db import models

# Create your models here.


class Geofence(models.Model):
    geofence_id = models.IntegerField
    serial_number = models.IntegerField
    name = models.CharField(max_length=250)
    coordinates = models.PolygonField()

