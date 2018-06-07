from django.db import models
from django.utils import timezone

# Create your models here.
class Note(models.Model):
  author = models.ForeignKey('auth.User', related_name="notes", on_delete=models.CASCADE)
  content = models.TextField()
  date = models.DateTimeField(blank=True, null=True)
  created_date = models.DateTimeField(default=timezone.now)
  updated_date = models.DateTimeField(blank=True, null=True)

  def __str__(self):
    return self.content[:100] 

