document.getElementById('questionForm').addEventListener('submit', async function(e) {
e.preventDefault();


const tema = document.getElementById('tema').value;
const pergunta = document.getElementById('pergunta').value;


const resposta = await fetch('/api/perguntas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ tema, pergunta })
});


if (resposta.ok) {
document.getElementById('mensagem').innerText = 'Pergunta enviada com sucesso!';
document.getElementById('questionForm').reset();
} else {
document.getElementById('mensagem').innerText = 'Erro ao enviar pergunta.';
}
});