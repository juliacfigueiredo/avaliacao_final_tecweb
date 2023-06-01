from rest_framework import serializers

from .models import FunFact, Summoner


class SummonerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Summoner
        fields = ['id', 'owner_name', 'summoner_id']

class FunFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = FunFact
        fields = '__all__'