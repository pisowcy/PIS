from rest_framework import serializers
from ..models import FavoritesUserProduction


class FUPSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoritesUserProduction
        fields = '__all__'
