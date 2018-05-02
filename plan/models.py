# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.gis.db import models


class Route(models.Model):
    route = models.LineStringField()
    name = models.CharField(max_length=250)
    date_time = models.DateTimeField(blank=True)

