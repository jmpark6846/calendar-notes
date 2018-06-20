from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.views.generic import View

from rest_framework import serializers, permissions, status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
import os

import datetime
import pytz
import jwt
from backend import settings

from .serializers import NoteSerializer, UserSerializer
from .permissions import IsOwnerOrReadOnly
from .models import Note
# Create your views here.

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.BASE_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )

class NoteList(ListAPIView):
  serializer_class = NoteSerializer
  permission_classes = (permissions.IsAuthenticated, )

  def get_queryset(self):
    notes = self.request.user.notes.all()
    return notes.filter(date__year=self.kwargs['year'], date__month=self.kwargs['month']+1)


class NoteCreate(CreateAPIView):
  serializer_class = NoteSerializer
  permission_classes = (permissions.IsAuthenticated, )

  def perform_create(self, serializer):
    serializer.save(author=self.request.user)


class NoteDetail(RetrieveUpdateDestroyAPIView):
  serializer_class = NoteSerializer
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

  def get_queryset(self):
    user = self.request.user
    return user.notes.all()


class NoteDetailByDate(RetrieveUpdateDestroyAPIView):
  
  serializer_class = NoteSerializer
  permission_classes = (permissions.IsAuthenticated,)
  
  def get_queryset(self):
    user = self.request.user
    return user.notes.all()

  def get_object(self):
    notes = self.get_queryset()
    date = datetime.datetime(self.kwargs['year'], self.kwargs['month'], self.kwargs['day'])

    try:
      obj = notes.get(date=date)
      self.check_object_permissions(self.request, obj)
    except Note.DoesNotExist:
      obj = None

    return obj


class UserCreate(CreateAPIView):
  serializer_class = UserSerializer
  permission_classes = (permissions.AllowAny,  )


class UserList(ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer


class UserDetail(RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer


def logout(request):
  response = JsonResponse({})
  response.delete_cookie('token')
  return response


def me(request):
  if 'token' in request.COOKIES:
    token = request.COOKIES['token']
    payload = jwt_decode(token)
    return JsonResponse({'authenticated':True, 'username':payload['username'] })
  else:
    return JsonResponse({'authenticated':False})


def check_exp(request):
  if 'token' in request.COOKIES:
    token = request.COOKIES['token']
    payload = jwt_decode(token)

    if(need_to_refresh(payload['exp'])):
      return JsonResponse({'refresh': True, 'token':token })
    else:
      return JsonResponse({'refresh': False})
  else:
    return JsonResponse({'unauthenticated':True})


def need_to_refresh(exp_timestamp):
  exp = datetime.datetime.utcfromtimestamp(exp_timestamp)
  now = datetime.datetime.utcnow()

  if exp - now < settings.TOKEN_REFRESH_DELTA[0] :
    return True
  else:
    return False


def jwt_decode(token):
  payload = jwt.decode(token, settings.JWT_AUTH['JWT_SECRET_KEY'], settings.JWT_AUTH['JWT_ALGORITHM'])
  return payload