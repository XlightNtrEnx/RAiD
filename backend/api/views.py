from unicodedata import name
from .models import *
from .serializers import *
from .permissions import *
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets, status
from django.db.models import F, Value
from django.db.models.functions import Concat

# Create your views here.
def index(request):
    pass

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('users-list', request=request, format=format),
        'opslogrecords': reverse('opslogrecords-list', request=request, format=format)
    })


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class OpslogRecordViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = OpslogRecord.objects.all()
    serializer_class = OpslogRecordSerializer
    permission_classes = [permissions.IsAuthenticated,
                          IsOwnerOrReadOnly]

    def list(self, request):
        queryset = OpslogRecord.objects.all().select_related('owner').annotate(full_name = Concat(F("owner__last_name"), Value(" "), F("owner__first_name"))).order_by('-created')[:10]
        serializer = OpslogRecordSerializer(reversed(queryset), many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        #request.data["full_name"] = request.user.last_name + "" + request.user.first_name
        request.data["owner"] = request.user.id 
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)