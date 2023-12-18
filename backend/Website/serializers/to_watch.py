from rest_framework import serializers
from ..models import ToWatch


class ToWatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToWatch
        fields = '__all__'
