from rest_framework import serializers
from ..models import ActorProduction


class ActorProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActorProduction
        fields = '__all__'
