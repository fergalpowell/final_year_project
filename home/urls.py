from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # url(r'^$', auth_views.login, {'template_name': 'home/login.html'}, name='login'),
    url(r'^', auth_views.login, {'template_name': 'home.html'}, name='home'),
    url(r'^logout/$', auth_views.logout, {'template_name': 'home.html'}, name='logout'),
    # url(r'^signup/$', views.signup, name='signup'),
]