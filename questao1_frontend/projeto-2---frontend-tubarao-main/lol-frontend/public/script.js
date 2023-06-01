// Função para obter o token de acesso
function obterToken() {
  const url = 'https://tecweb-js.insper-comp.com.br/token';
  const username = 'juliaf1'; 

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const body = {
    username: username
  };

  return axios.post(url, body, headers)
    .then(response => {
      const token = response.data.accessToken;
      return token;
    })
    .catch(error => {
      console.error('Erro ao obter o token:', error);
      throw error;
    });
}

// Função para fazer a requisição e exibir o email do usuário
function exibirEmailUsuario(token) {
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
      const exercicios = response.data;
      const emailUsuario = exercicios['nome-do-usuario'].entrada.email;
      const spanEmailUsuario = document.getElementById('email-usuario');
      spanEmailUsuario.textContent = emailUsuario;
    })
    .catch(error => {
      console.error('Erro ao obter a lista de exercícios:', error);
      throw error;
    });
}

// Chamando as funções em sequência
obterToken()
  .then(token => exibirEmailUsuario(token))
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
