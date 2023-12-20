from rest_framework import generics

from ..models import Review
from ..serializers.review import ReviewSerializer


class ReviewList(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer