import requests
import environ
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

BASE_URL="https://br1.api.riotgames.com/lol"

def get_summoner(name):
  return requests.get(f'{BASE_URL}/summoner/v4/summoners/by-name/{name}', headers={
    'X-Riot-Token': env('RIOT_API_KEY')
  }).json()

def get_elo(summoner_id):
  return requests.get(f'{BASE_URL}/league/v4/entries/by-summoner/{summoner_id}', headers={
    'X-Riot-Token': env('RIOT_API_KEY')
  }).json()