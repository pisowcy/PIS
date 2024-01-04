from rest_framework import generics

from ..models import FavoritesUserProduction
from ..serializers.favorites_user_production import FUPSerializer


class FUPList(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = FavoritesUserProduction.objects.all()
    serializer_class = FUPSerializer


class FUPByProduction(generics.ListCreateAPIView):
    queryset = FavoritesUserProduction.objects.all()
    serializer_class = FUPSerializer

    def get_queryset(self):
        production_id = self.kwargs.get('id')
        return FavoritesUserProduction.objects.filter(production_id=production_id)


class FUPByUser(generics.ListCreateAPIView):
    queryset = FavoritesUserProduction.objects.all()
    serializer_class = FUPSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('id')
        return FavoritesUserProduction.objects.filter(user_id=user_id)
