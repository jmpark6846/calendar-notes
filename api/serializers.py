from django.contrib.auth.models import User

from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
  author = serializers.ReadOnlyField(source="author.username")

  class Meta:
    model = Note 
    fields = '__all__'


# TODO: 유저 가입을 가입 폼을 활용해서 서버단 에서 VALIDATION하는 걸로 수정 (현재는 LoginPage 에서 validation)
class UserSerializer(serializers.ModelSerializer):
  notes = serializers.PrimaryKeyRelatedField(many=True, allow_null=True, queryset=Note.objects.all())

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
    )
    user.set_password(validated_data['password'])
    user.save()
    
    return user

  class Meta:
    model = User
    fields = ('id', 'username', 'password', 'notes')
    write_only_fields = ('password',)
    