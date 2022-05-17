from django.db import models
from django.contrib.auth.models import User

class OpslogRecord(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    event = models.TextField()
    owner = models.ForeignKey(User, related_name='opslogrecords', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created']