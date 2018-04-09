from django.conf.urls import url
from . import views
from djgeojson.views import GeoJSONLayerView


urlpatterns = [
    url(r'^$', views.load_map, name='track'),
    url(r'^current-location-data/$', views.current_location_detail, name='location-data'),
    url(r'^home-location-data/$', views.home_location_detail, name='location-data'),
    url(r'^work-location-data/$', views.work_location_detail, name='location-data'),
    url(r'^journey-data/$', views.journey_detail, name='journey-data')
    ]