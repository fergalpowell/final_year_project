# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from track.models import Location
from django.utils import timezone
import pytz

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    serial_number = models.CharField(max_length=250, blank=True, null=True)
    tracking_device_number = models.CharField(max_length=250, blank=True, null=True)
    bike_image_ref = models.CharField(max_length=250, blank=True, null=True)
    bike_model = models.CharField(max_length=250, blank=True, null=True)
    bike_colour = models.CharField(max_length=250, blank=True, null=True)

    def save(self, **kwargs):
        super(Profile, self).save(**kwargs)
        location = Location(user=self, date_time=timezone.now())
        location.save()

    def get_number(self):
        return self.tracking_device_number


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
