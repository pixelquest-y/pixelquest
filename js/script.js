const player = document.getElementById('player');
const chaves = Array.from(document.getElementsByClassName('chave'));
const inimigos = Array.from(document.getElementsByClassName('inimigo'));
const contadorChaves = document.getElementById('contador-chaves');
const mensagem = document.getElementById('mensagem');

let jogoAtivo = true;

function mostrarTela(id) {
  document.getElementById("menu").style.display = "none";
  document.querySelectorAll(".tela").forEach(t => t.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function voltarMenu() {
  document.querySelectorAll(".tela").forEach(t => t.style.display = "none");
  document.getElementById("menu").style.display = "block";
}

function sair() {
  mostrarTela("despedida");
}

let volumeAtual = parseFloat(localStorage.getItem("volume")) || 0.3;

function playHover() {
  const sound = document.getElementById("hover-sound");
  sound.currentTime = 0;
  sound.play();
}

function playClick() {
  const sound = document.getElementById("click-sound");
  sound.currentTime = 0;
  sound.play();
}


function ajustarVolume(valor) {
  volumeAtual = parseFloat(valor);
  localStorage.setItem("volume", volumeAtual);
}

function esconderTelas() {
  document.querySelectorAll(".tela").forEach(tela => tela.style.display = "none");
}

function iniciarJogo() {
  window.location.href = "html/fase1.html";
}

// função global para fase1 usar
window.tocarSom = function(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.volume = volumeAtual;
    audio.currentTime = 0;
    audio.play();
  }
};

function resetarFaseCompleta() {
  // Esconder Game Over e Vitória
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('tela-vitoria').style.display = 'none';

  posX = 10;   // <- ESSENCIAL para a lógica do controle.js
  posY = 10;
  atualizarPosicao(); // Usa as variáveis reais

  // Resetar variáveis de posição
  // Resetar HUD de chaves
chavesColetadas = 0;
  document.getElementById('numero-chaves').innerText = 0;

  for (let i = 1; i <= 3; i++) {
    const chaveIcon = document.getElementById(`chave-${i}`);
    if (chaveIcon) {
      chaveIcon.classList.remove('coletada');
      chaveIcon.style.opacity = '0.5';
    }
  }

    player.classList.remove('dano', 'morrer');

  // Resetar chaves no cenário
  document.querySelectorAll('.chave').forEach(chave => {
    chave.style.display = 'block';
    chave.classList.remove('coletada');
  });

  // Resetar inimigos (se necessário)
  document.querySelectorAll('.inimigo').forEach(inimigo => {
    inimigo.style.top = inimigo.getAttribute('data-top-inicial') || inimigo.style.top;
    inimigo.style.left = inimigo.getAttribute('data-left-inicial') || inimigo.style.left;
  });

  function danoPlayer() {
  player.classList.add('dano');
  setTimeout(() => player.classList.remove('dano'), 300);
}

  function animarChave(chave) {
    chave.style.transition = 'transform 0.3s, opacity 0.3s';
    chave.style.transform = 'scale(1.5)';
    chave.style.opacity = '0';
    setTimeout(() => chave.style.display = 'none', 300);
  }

  document.querySelectorAll('.inimigo, .inimigoCaverna').forEach(inimigo => {
  // Restaura as posições salvas
  inimigo.style.top = inimigo.dataset.topInicial;
  inimigo.style.left = inimigo.dataset.leftInicial;

  // Resetar outras propriedades se necessário:
  inimigo.setAttribute('data-direcao', '1'); // reseta a direção para evitar bugs de inversão
});

  // Reset jogoAtivo e evento de teclado
  jogoAtivo = true;

  window.removeEventListener('keydown', controle);
  window.addEventListener('keydown', controle);

  console.log('Fase totalmente resetada e variáveis corrigidas!');
}

// Garante que o player apareça na posição inicial logo que a fase carrega
window.onload = () => {
  atualizarPosicao();
};

document.addEventListener("DOMContentLoaded", () => {
  const esquerda = document.getElementById("btn-esquerda");
  const direita = document.getElementById("btn-direita");
  const pular = document.getElementById("btn-pular");

  esquerda.addEventListener("touchstart", () => mover("esquerda"));
  direita.addEventListener("touchstart", () => mover("direita"));
  pular.addEventListener("touchstart", () => pularPersonagem());
});