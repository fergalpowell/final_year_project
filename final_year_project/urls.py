from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [

    url(r'^$', include('home.urls')),
    url(r'^admin/', admin.site.urls),

    url(r'^track/', include('track.urls')),
    url(r'^plan/', include('plan.urls')),

]
