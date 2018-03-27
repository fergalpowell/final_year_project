from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template
from .models import Location
from .serializers import LocationSerializer


def load_map(request):
    t = get_template('track.html')
    html = t.render()
    return HttpResponse(html)


def location_detail(request):
    try:
        location = Location.objects.get(pk=1)
    except Location.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = LocationSerializer(location)
        return JsonResponse(serializer.data, safe=False)
