from django.conf.urls import url
from . import views
from djgeojson.views import GeoJSONLayerView
from plan.models import BikeStation


urlpatterns = [
    url(r'^$', views.load_map, name='plan'),
    url(r'^data/$', GeoJSONLayerView.as_view(model=BikeStation, properties='location, geom'),
        name='data')
    ]