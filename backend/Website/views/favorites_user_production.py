from rest_framework import generics, status

from ..models import FavoritesUserProduction
from ..serializers.favorites_user_production import FUPSerializer
from rest_framework.exceptions import NotFound
from rest_framework.response import Response


class FUPList(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = FavoritesUserProduction.objects.all()
    serializer_class = FUPSerializer


class FUPDetail(generics.RetrieveUpdateDestroyAPIView):
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


class FUPByUserAndProduction(generics.RetrieveUpdateDestroyAPIView):
    queryset = FavoritesUserProduction.objects.all()
    serializer_class = FUPSerializer

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        production_id = self.kwargs.get('production_id')

        try:
            obj = FavoritesUserProduction.objects.get(user_id=user_id, production_id=production_id)
            return obj
        except FavoritesUserProduction.DoesNotExist:
            raise NotFound("Record does not exist.")

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
