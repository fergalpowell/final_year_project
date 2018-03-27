from django.conf.urls import url
from . import views
from djgeojson.views import GeoJSONLayerView


urlpatterns = [
    url(r'^$', views.load_map, name='track'),
    url(r'^location-data/$', views.location_detail, name='location-data')
    ]