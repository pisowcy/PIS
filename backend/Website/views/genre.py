from rest_framework import generics

from ..models import Genre
from ..serializers.genre import GenreSerializer


class GenreList(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class GenreDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
