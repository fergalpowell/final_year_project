# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    serial_number = models.IntegerField(primary_key=True)
    tracking_device_number = models.CharField(max_length=250)
    bike_image_ref = models.CharField(max_length=250)
    bike_model = models.CharField(max_length=250)
    bike_colour = models.CharField(max_length=250)
