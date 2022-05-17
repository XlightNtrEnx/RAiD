from multiprocessing import Event
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

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

class KeyRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = KeyRecord
        fields = ['id', 'created', 'returning_or_not', 'borrowing_person', 'key']

class KeySerializer(serializers.ModelSerializer):

    class Meta:
        model = Key
        fields = ['code', 'name', 'available_for_loan']


    