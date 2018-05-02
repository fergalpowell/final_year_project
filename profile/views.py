# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import redirect, render
from profile.forms import UserForm, ProfileForm
from django.contrib.auth.decorators import login_required
from django.db import transaction
from .models import Profile
from plan.models import Route
from django.http import HttpResponse, JsonResponse
from .serializers import ProfileSerializer
from django.template.loader import get_template
from plan.serializers import RouteSerializer


@login_required
@transaction.atomic
def update_profile(request):
    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        profile_form = ProfileForm(request.POST, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return redirect('profile-home')
    else:
        user_form = UserForm(instance=request.user)
        profile_form = ProfileForm(instance=request.user.profile)
    return render(request, 'profile/profile.html', {
        'user_form': user_form,
        'profile_form': profile_form
    })


def load_profile(request):
    t = get_template('profile.html')
    html = t.render()
    return HttpResponse(html)


def profile_detail(request):
    try:
        profile = Profile.objects.get(pk=11)
    except Profile.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return JsonResponse(serializer.data, safe=False)


def route_detail(request):
    try:
        route = Route.objects.latest('date_time')
    except Route.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = RouteSerializer(route)
        return JsonResponse(serializer.data, safe=False)
