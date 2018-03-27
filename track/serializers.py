from .models import Location
from rest_framework_gis.serializers import GeoFeatureModelSerializer


class LocationSerializer(GeoFeatureModelSerializer):

    class Meta:
        model = Location
        geo_field = "current_location"
        fields = ('user', 'home_location', 'work_location')
