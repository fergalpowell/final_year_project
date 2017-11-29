# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class User(models.Model):
    location = models.IntegerField
    name = models.CharField(max_length=250)
    email = models.CharField(max_length=250)
    bike_image_ref = models.CharField(max_length=250)
    bike_model = models.CharField(max_length=250)
    bike_colour = models.CharField(max_length=250)