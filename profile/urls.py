from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.load_profile, name='profile'),
    url(r'^profile-data/', views.profile_detail, name='profile-data'),
    url(r'^route-data/', views.route_detail, name='route-data'),
]
