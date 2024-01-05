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


class ActorByProduction(generics.ListCreateAPIView):
    serializer_class = ActorSerializer

    def get_queryset(self):
        production_id = self.kwargs.get('id')
        return Actor.objects.filter(actorproduction__production_id=production_id)
