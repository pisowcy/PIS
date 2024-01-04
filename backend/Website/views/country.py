from rest_framework import generics

from ..models import Country
from ..serializers.country import CountrySerializer


class CountryList(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
