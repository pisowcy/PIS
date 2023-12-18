from rest_framework import generics

from ..models import Actor
from ..serializers.actor import ActorSerializer


class ActorList(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer


class ActorDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
