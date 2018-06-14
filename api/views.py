from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from rest_framework import serializers, permissions, status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

import datetime
import pytz
import jwt
from backend import settings

from .serializers import NoteSerializer, UserSerializer
from .permissions import IsOwnerOrReadOnly
from .models import Note
# Create your views here.

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
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
  
  def get_queryset(self):
    user = self.request.user
    return user.notes.all()

  def get_object(self):
    notes = self.get_queryset()
    date = datetime.datetime(self.kwargs['year'], self.kwargs['month'], self.kwargs['day'])

    try:
      obj = notes.get(date=date)
    except Note.DoesNotExist:
      obj = None

    self.check_object_permissions(self.request, obj)
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
    return JsonResponse({'isAuthenticated':True, 'username':payload['username']})
  else:
    return JsonResponse({'isAuthenticated':False})


def check_exp(request):
  if 'token' in request.COOKIES:
    token = request.COOKIES['token']

    payload = jwt_decode(token)
    exp = datetime.utcfromtimestamp(payload['exp']) 
    now = datetime.utcnow()

    if exp - now < settings.TOKEN_REFRESH_DELTA :
      return JsonResponse({'isAuthenticated':True, 'username':payload['username'], 'msg':'need to refresh', 'token':token})
    else:
      return JsonResponse({'isAuthenticated':True, 'username':payload['username'], 'msg':'not expired'})
  else:
    return JsonResponse({'isAuthenticated':False, 'msg':'not authenticated; token expired'})


def jwt_decode(token):
  payload = jwt.decode(token, settings.JWT_AUTH['JWT_SECRET_KEY'], settings.JWT_AUTH['JWT_ALGORITHM'])
  return payload