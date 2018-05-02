from django.conf.urls import url
from . import views
from djgeojson.views import GeoJSONLayerView


urlpatterns = [
    url(r'^$', views.load_map, name='plan'),
    url(r'^save-route/', views.save_route, name='save-route')
]
