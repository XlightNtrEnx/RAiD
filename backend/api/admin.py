from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(OpslogRecord)
admin.site.register(Key)
admin.site.register(KeyRecord)