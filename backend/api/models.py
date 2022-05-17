from django.db import models
from django.contrib.auth.models import User

class OpslogRecord(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    event = models.TextField()
    owner = models.ForeignKey(User, related_name='opslogrecords', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created']

class Key(models.Model):
    code = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    available_for_loan = models.BooleanField()

class KeyRecord(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    #authorising_person = models.ForeignKey(User, related_name='recordsauthorized', on_delete=models.CASCADE)
    borrowing_person = models.ForeignKey(User, related_name='recordsinitiated', on_delete=models.CASCADE)
    key = models.ForeignKey(User, related_name='records', on_delete=models.CASCADE)
    borrowing_or_not = models.BooleanField()

    class Meta:
        #unique_together = ['authorising_person', 'borrowing_person']
        ordering = ['created']
