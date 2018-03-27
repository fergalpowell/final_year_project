from django import forms
from django.contrib.auth.models import User
from profile.models import Profile


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['serial_number', 'tracking_device_number', 'bike_colour', 'bike_image_ref',
                  'bike_model']
