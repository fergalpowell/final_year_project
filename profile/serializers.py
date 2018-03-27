from .models import Profile
from rest_framework_gis.serializers import ModelSerializer


class ProfileSerializer(ModelSerializer):

    class Meta:
        model = Profile
        fields = ('user', 'serial_number', 'tracking_device_number', 'bike_image_ref',
                  'bike_model', 'bike_colour')
