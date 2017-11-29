# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.gis.db import models


class BikeStation(models.Model):
    location = models.CharField(max_length=250)
    geom = models.PointField()
