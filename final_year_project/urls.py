from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [

    url(r'^', include('plan.urls')),
    url(r'^track/', include('track.urls')),
    url(r'^plan/', include('plan.urls')),
    # url(r'^track/', include('track.urls')),
    # url(r'^track/', include('track.urls')),
    url(r'^admin/', admin.site.urls),
]
