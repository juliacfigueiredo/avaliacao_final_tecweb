# lol-insper

Backend do nosso Projeto 2 de TechWeb. Armazena invocadores do LoL associados aos seus donos e puxa o elo deles para exibição no nosso frontend.

# Setup

## 1. Criar ambiente virtual

```
python3 -m venv env
```

## 2. Ativar ambiente virtual

```
source env/bin/activate
```

## 3. Instalar dependências

```
pip install -r requirements.txt
```

## 4. Criar banco de dados

```
python3 manage.py migrate
```

## 5. Criar super usuário

```
python3 manage.py createsuperuser
```

## 6. Definir variáveis de ambiente
[Siga a seção "Getting started with Riot API key" neste artigo para obter uma chave da API da riot.](https://towardsdatascience.com/how-to-use-riot-api-with-python-b93be82dbbd6) Crie um arquivo `.env` na raíz do projeto e defina a `RIOT_API_KEY` nele com a sua chave da API da Riot.

```d
RIOT_API_KEY="RGAPI-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
```

## 7. Rodar servidor

```
python3 manage.py runserver
```

# Endpoints

## Armazenar summoner

Recebe o nome do dono da conta e o nome do summoner e armazena no banco de dados. **Esse endpoint faz uma request pra API da Riot pra puxar o ID do summoner.**
  
  ```
  POST /api/summoners/

  {
    "owner_name": "Pedro Fracassi",
    "summoner_name": "Fracassi"
  }
  ```

### Retorno

  ```json
  {
    "id": 1,
    "owner_name": "Pedro Fracassi",
    "summoner_id": "1"
  }
  ```

## Listar summoners

Lista todos os summoners armazenados no banco de dados.

  ```
  GET /api/summoners/
  ```

### Retorno

  ```json
  [
    {
      "id": 1,
      "owner_name": "Pedro Fracassi",
      "summoner_id": "324t5w43ygw3qt4f31q24f1q34fq324fq34fq3f4w3"
    },
    {
      "id": 2,
      "owner_name": "Pedro Fracassi",
      "summoner_id": "324325436y32tq42gfw3q4ef3qwt4gf3qw4egfqw32"
    }
    ...
  ]
  ```

## Puxar elo do summoner

Puxa o elo do summoner armazenado no banco de dados. **Esse endpoint faz uma request pra API da Riot pra puxar o elo do summoner.**

  ```
  GET /api/summoners/<summoner_id>/elo/
  ```

### Retorno

  ```json
  {
    "leagueId": "61279367-76f2-34fe-aa72-386a19a90053",
    "queueType": "RANKED_SOLO_5x5",
    "tier": "CHALLENGER",
    "rank": "I",
    "summonerId": "uagqwn455OUnKqlVtNtdjnVFj0RbtVAo7Kn_CmC7eVibKQ",
    "summonerName": "fu09nfn8yu0f0e",
    "leaguePoints": 2014,
    "wins": 284,
    "losses": 198,
    "veteran": true,
    "inactive": false,
    "freshBlood": false,
    "hotStreak": true
}
  ```