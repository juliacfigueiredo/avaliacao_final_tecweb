const axios = require('axios');

// Função para obter o token
function getToken() {
  const url = 'https://tecweb-js.insper-comp.com.br/token';
  const username = 'juliaf1'; 

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const data = {
    username: username
  };

  return axios.post(url, data, headers)
    .then(response => {
      return response.data.accessToken;
    })
    .catch(error => {
      console.error('Erro ao obter o token:', error);
    });
}

// Função para obter a lista de exercícios
function getExercises(token) {
  const url = 'https://tecweb-js.insper-comp.com.br/exercicio';

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  return axios.get(url, headers)
    .then(response => {
      console.log('Lista de exercícios:', response.data);
    })
    .catch(error => {
      console.error('Erro ao obter a lista de exercícios:', error);
    });
}

// Chama as funções em sequência
getToken()
  .then(token => {
    console.log('Token obtido:', token);
    return getExercises(token);
  })
  .catch(error => {
    console.error('Erro:', error);
  });


const exercicios = {
'nome-do-usuario': {
    titulo: 'Nome do usuário',
    descricao: 'Qual é o nome do usuário deste e-mail? Exemplo: o nome do usuário do e-mail fulano123@email.com.br é fulano123',
    entrada: { email: 'hjkcoj@rhrgk.com.by' },
    pontuacao: 0.5
},
};

const emailUsuario = exercicios['nome-do-usuario'].entrada.email;

console.log('Email do usuário:', emailUsuario);

