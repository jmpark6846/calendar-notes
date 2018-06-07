from django.contrib.auth.models import User

from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
  author = serializers.ReadOnlyField(source="author.username")

  class Meta:
    model = Note 
    fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
  notes = serializers.PrimaryKeyRelatedField(many=True, allow_null=True, queryset=Note.objects.all())

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username']
    ) 
    user.set_password(validated_data['password'])
    user.save()
    
    return user

  class Meta:
    model = User
    fields = ('id', 'username', 'password', 'notes')
    write_only_fields = ('password',)
    