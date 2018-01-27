from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic.base import TemplateView

urlpatterns = [
    url(r'^$', auth_views.login, {'template_name': 'home/login.html'}, name='login'),
    url(r'^logout/$', auth_views.logout, {'template_name': 'home/login.html'},  name='logout'),
    url(r'^home$', TemplateView.as_view(template_name='home/home.html'), name='home'),
]