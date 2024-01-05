from rest_framework import generics

from ..models import Production
from ..serializers.production import ProductionSerializer


class ProductionList(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = Production.objects.all()
    serializer_class = ProductionSerializer


class ProductionDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    queryset = Production.objects.all()
    serializer_class = ProductionSerializer


class ProductionByActor(generics.ListCreateAPIView):
    serializer_class = ProductionSerializer

    def get_queryset(self):
        production_id = self.kwargs.get('id')
        return Production.objects.filter(actorproduction__actor_id=production_id)
