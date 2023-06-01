from django.db import models


class Summoner(models.Model):
    owner_name = models.CharField(max_length=200)
    summoner_id = models.TextField()
    
class FunFact(models.Model):
    fact = models.TextField() 