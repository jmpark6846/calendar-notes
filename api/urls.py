"""one URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from . import views

urlpatterns = [

    # rest api
    path('notes/create/', views.NoteCreate.as_view()),
    path('notes/<int:year>/<int:month>/', views.NoteList.as_view(), name='note-list'),
    path('notes/<int:year>/<int:month>/<int:day>/', views.NoteDetailByDate.as_view()),
    path('notes/<pk>/', views.NoteDetail.as_view()),
    
    path('users/create/', views.UserCreate.as_view()),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<pk>/', views.UserDetail.as_view()),
    
    path('token/', obtain_jwt_token, name='obtain_jwt_token'),
    path('token/refresh/', refresh_jwt_token, name='refresh_jwt_token'),

    path('me/', views.me),
    path('logout/', views.logout)
    
]
