# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template


def load_map(request):
    t = get_template('plan.html')
    html = t.render()
    return HttpResponse(html)
