from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [

    url(r'^admin/', admin.site.urls),
    url(r'^track/', include('track.urls')),
    url(r'^plan/', include('plan.urls')),
    url(r'^profile/', include('profile.urls')),
    url(r'^home/', include('home.urls')),
    url(r'^', include('home.urls')),

]
