# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from plan.models import BikeStation
import csv
from django.template.loader import get_template
from django.contrib.gis.geos import fromstr


def load_map(request):
    csv_file = '/home/fergal/final_year_project/plan/stations/stations.csv'
    my_csv = csv.reader(open(csv_file))

    for line in my_csv:
        if line[1] != 'X':
            my_long_lat = str(line[1] + " " + line[2])
            _, created = BikeStation.objects.get_or_create(
                location=line[5],
                geom=fromstr('POINT(' + my_long_lat + ')')
            )
    t = get_template('plan.html')
    html = t.render()
    return HttpResponse(html)
