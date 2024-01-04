from rest_framework import generics

from ..models import ActorProduction
from ..serializers.actor_production import ActorProductionSerializer


class ActorProductionList(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = ActorProduction.objects.all()
    serializer_class = ActorProductionSerializer


class ActorProductionByProduction(generics.ListCreateAPIView):
    queryset = ActorProduction.objects.all()
    serializer_class = ActorProductionSerializer

    def get_queryset(self):
        production_id = self.kwargs.get('id')
        return ActorProduction.objects.filter(production_id=production_id)


class ActorProductionByActor(generics.ListCreateAPIView):
    queryset = ActorProduction.objects.all()
    serializer_class = ActorProductionSerializer

    def get_queryset(self):
        actor_id = self.kwargs.get('id')
        return ActorProduction.objects.filter(actor_id=actor_id)
