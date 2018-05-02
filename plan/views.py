# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from plan.models import Route
from django.template.loader import get_template
import json
from django.contrib.gis.geos import GEOSGeometry, LineString, Point
from django.utils import timezone

def load_map(request):
    t = get_template('plan.html')
    html = t.render()
    return HttpResponse(html)


def save_route(request):
    name = request.POST.get('name')
    route1 = request.POST.get('route')
    route2 = json.loads(route1)
    route = LineString((route2[0]["lat"], route2[0]["lng"]), (route2[1]["lat"], route2[1]["lng"]), srid=4326)
    current_time = timezone.now()
    r = Route(route=route, name=name, date_time=current_time)
    r.save()
    return HttpResponse("OK")
