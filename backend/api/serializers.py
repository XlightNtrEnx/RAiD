from multiprocessing import Event
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import OpslogRecord

class UserSerializer(serializers.ModelSerializer):
    opslogrecords = serializers.PrimaryKeyRelatedField(many=True, queryset=OpslogRecord.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'opslogrecords']

class OpslogRecordSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = OpslogRecord
        fields = ['id', 'created', 'event', 'owner', 'full_name']


    