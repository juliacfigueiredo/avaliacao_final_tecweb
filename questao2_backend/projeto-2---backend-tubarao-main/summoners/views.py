import statistics
from pstats import Stats

from django.http import Http404
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import riot_api
from .models import FunFact, Summoner
from .serializers import FunFactSerializer, SummonerSerializer


@api_view(['GET', 'POST'])
def api_summoner(request, summoner_id):
    try:
        summoner = Summoner.objects.get(id=summoner_id)
    except Summoner.DoesNotExist:
        raise Http404()

    serialized_summoner = SummonerSerializer(summoner)
    return Response(serialized_summoner.data)

@api_view(['GET'])
def api_summoner_elo(request, summoner_id):
    try:
        summoner = Summoner.objects.get(id=summoner_id)
    except Summoner.DoesNotExist:
        raise Http404()

    elos = riot_api.get_elo(summoner.summoner_id)
    try:
        soloqueue = next(item for item in elos if item["queueType"] == "RANKED_SOLO_5x5")
    except:
        return Response({})

    return Response(soloqueue)

@api_view(['GET', 'POST'])
def api_summoners(request):
    if request.method == 'GET':
      try:
          summoners = Summoner.objects.all()
      except Summoner.DoesNotExist:
          raise Http404()

      serialized_summoners = SummonerSerializer(summoners, many=True)
      return Response(serialized_summoners.data)

    elif request.method == 'POST':
      summoner = Summoner()
      new_summoner_data = request.data
      summoner.owner_name = new_summoner_data['owner_name']

      name = new_summoner_data['summoner_name']
      riot_summoner = riot_api.get_summoner(name)
      print(riot_summoner)

      summoner.summoner_id = riot_summoner['id']
      summoner.save()

      serialized_summoner = SummonerSerializer(summoner)
      return Response(serialized_summoner.data)


@api_view(['GET', 'POST'])
def funfact_list_create(request):
    if request.method == 'GET':
        funfacts = FunFact.objects.all()
        serializer = FunFactSerializer(funfacts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FunFactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=Stats.HTTP_201_CREATED)
        return Response(serializer.errors, status=Stats.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def funfact_delete(request, pk):
    try:
        funfact = FunFact.objects.get(pk=pk)
        funfact.delete()
        return Response(status=Stats.HTTP_204_NO_CONTENT)
    except FunFact.DoesNotExist:
        raise Http404()