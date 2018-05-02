from .models import Route
from rest_framework_gis.serializers import GeoFeatureModelSerializer


class RouteSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Route
        geo_field = "route"
        fields = ('name', 'date_time')
