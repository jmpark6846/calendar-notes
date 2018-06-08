from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User

from rest_framework import serializers, permissions, status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

import datetime

from .serializers import NoteSerializer, UserSerializer
from .permissions import IsOwnerOrReadOnly
from .models import Note
# Create your views here.

@api_view(['GET'])
def api_root(request, format=None):
  return Response({
    'users' : reverse('user-list', request=request, format=format),
    'notes': reverse('note-list', request=request, format=format)
  })
  
class NoteList(ListCreateAPIView):
  serializer_class = NoteSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

  def get_queryset(self):
    user = self.request.user
    return user.notes.all()

  def perform_create(self, serializer):
    serializer.save(author=self.request.user)


class NoteDetail(RetrieveUpdateDestroyAPIView):
  serializer_class = NoteSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

  def get_queryset(self):
    user = self.request.user
    return user.notes.all()


class NoteDetailByDate(RetrieveUpdateDestroyAPIView):
  
  serializer_class = NoteSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)
  
  def get_queryset(self):
    user = self.request.user
    return user.notes.all()

  def get_object(self):
    queryset = self.get_queryset()
    
    date = datetime.datetime(self.kwargs['year'], self.kwargs['month'], self.kwargs['day'])

    obj = get_object_or_404(queryset, date=date)
    self.check_object_permissions(self.request, obj)
    return obj


class UserCreate(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = (permissions.AllowAny,  )

class UserList(ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer


class UserDetail(RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer


