from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Avg

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


class ReviewByProduction(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        production_id = self.kwargs.get('id')
        return Review.objects.filter(production_id=production_id)


class ReviewByProductionStats(APIView):
    def get(self, request, id):
        reviews = Review.objects.filter(production_id=id)
        stats = reviews.aggregate(
            review_count=Count('id'),
            average_score=Avg('review')
        )

        return Response(stats)
