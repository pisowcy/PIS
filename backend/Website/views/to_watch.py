from rest_framework import generics

from ..models import ToWatch
from ..serializers.to_watch import ToWatchSerializer


class ToWatchList(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = ToWatch.objects.all()
    serializer_class = ToWatchSerializer


class ToWatchDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    queryset = ToWatch.objects.all()
    serializer_class = ToWatchSerializer


class ToWatchByProduction(generics.ListCreateAPIView):
    queryset = ToWatch.objects.all()
    serializer_class = ToWatchSerializer

    def get_queryset(self):
        production_id = self.kwargs.get('id')
        return ToWatch.objects.filter(production_id=production_id)


class ToWatchByUser(generics.ListCreateAPIView):
    queryset = ToWatch.objects.all()
    serializer_class = ToWatchSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('id')
        return ToWatch.objects.filter(user_id=user_id)
