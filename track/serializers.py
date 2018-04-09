from .models import Location, Journey
from rest_framework_gis.serializers import GeoFeatureModelSerializer


class CurrentLocationSerializer(GeoFeatureModelSerializer):

    class Meta:
        model = Location
        geo_field = "current_location"
        fields = ('user', 'home_location', 'work_location')


class HomeLocationSerializer(GeoFeatureModelSerializer):

    class Meta:
        model = Location
        geo_field = "home_location"
        fields = ('user', 'current_location', 'work_location')


class WorkLocationSerializer(GeoFeatureModelSerializer):

    class Meta:
        model = Location
        geo_field = "work_location"
        fields = ('user', 'current_location', 'home_location')


class JourneySerializer(GeoFeatureModelSerializer):

    class Meta:
        model = Journey
        geo_field = "route"
        fields = ('distance', 'user', 'highest_elevation', 'lowest_elevation', 'top_speed', 'duration',
                  'saved_journey', 'outside_geofence', 'finished', 'date_time')
