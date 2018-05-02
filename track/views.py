from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template
from .models import Location, Journey
from .serializers import CurrentLocationSerializer, HomeLocationSerializer, \
    WorkLocationSerializer, JourneySerializer


def load_map(request):
    t = get_template('track.html')
    html = t.render()
    return HttpResponse(html)


def current_location_detail(request):
    try:
        location = Location.objects.get(pk=1)
    except Location.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CurrentLocationSerializer(location)
        return JsonResponse(serializer.data, safe=False)


def home_location_detail(request):
    try:
        location = Location.objects.get(pk=1)
    except Location.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = HomeLocationSerializer(location)
        return JsonResponse(serializer.data, safe=False)


def work_location_detail(request):
    try:
        location = Location.objects.get(pk=1)
    except Location.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = WorkLocationSerializer(location)
        return JsonResponse(serializer.data, safe=False)


def journey_detail(request):
    try:
        journey = Journey.objects.all()
    except Journey.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = JourneySerializer(journey, many=True)
        return JsonResponse(serializer.data, safe=False)
