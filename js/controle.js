  let velocidadeOriginal = 5; // Velocidade normal do player
  let velocidadeAtual = velocidadeOriginal; // Velocidade que pode ser alterada
  let lento = false; // Flag para impedir múltiplas ativações
  let algumaTeclaPressionada = false;

function controle(e) {
  if (e.key === "Escape") {
    reiniciarFase();
    return;
  }

  if (!jogoAtivo) return;

  const gameArea = document.querySelector('.cenario');
  const areaWidth = gameArea.offsetWidth;
  const areaHeight = gameArea.offsetHeight;
  const playerWidth = player.offsetWidth;
  const playerHeight = player.offsetHeight;

  algumaTeclaPressionada = false; // reseta

  switch(e.key) {
    case 'ArrowUp':
    case 'w':
    case 'cima':
      if (posY - velocidade >= 0) {
        posY -= velocidade;
        algumaTeclaPressionada = true;
      }
      break;
    case 'ArrowDown':
    case 's':
    case 'baixo':
      if (posY + playerHeight + velocidade <= areaHeight) {
        posY += velocidade;
        algumaTeclaPressionada = true;
      }
      break;
    case 'ArrowLeft':
    case 'a':
    case 'esquerda':
      if (posX - velocidade >= 0) {
        posX -= velocidade;
        algumaTeclaPressionada = true;
      }
      break;
    case 'ArrowRight':
    case 'd':
    case 'direita':
      if (posX + playerWidth + velocidade <= areaWidth) {
        posX += velocidade;
        algumaTeclaPressionada = true;
      }
      break;
  }

 if (algumaTeclaPressionada) {
  player.classList.add('andando');
  player.classList.remove('respirando'); // remove respiração se andando

  clearTimeout(player.stopAnim); // reseta timer se teclando sempre
  player.stopAnim = setTimeout(() => {
    player.classList.remove('andando');
    player.classList.add('respirando'); // volta a respirar parado
  }, 200); // 200ms sem tecla = volta respiração
} else {
  // Se não apertou nada nessa tecla, garante que ele respira
  player.classList.add('respirando');
}

  atualizarPosicao();
  checarChaves();
  checarInimigos();
}

// Para garantir que o listener não duplique:
window.removeEventListener('keydown', controle);
window.addEventListener('keydown', controle);

const botoesTouch = document.querySelectorAll('#controles-touch button');
let intervaloMovimento;

botoesTouch.forEach(botao => {
  const direcao = botao.dataset.direcao;

  botao.addEventListener('touchstart', (e) => {
    e.preventDefault(); // evita zoom duplo no celular
    mover(direcao);
    intervaloMovimento = setInterval(() => mover(direcao), 100);
  });

  botao.addEventListener('touchend', () => {
    clearInterval(intervaloMovimento);
  });
});

function mover(direcao) {
  if (!jogoAtivo) return;

  switch (direcao) {
    case 'cima':
      if (posY - velocidade >= 0) posY -= velocidade;
      break;
    case 'baixo':
      if (posY + player.offsetHeight + velocidade <= document.querySelector('.cenario').offsetHeight) posY += velocidade;
      break;
    case 'esquerda':
      if (posX - velocidade >= 0) posX -= velocidade;
      break;
    case 'direita':
      if (posX + player.offsetWidth + velocidade <= document.querySelector('.cenario').offsetWidth) posX += velocidade;
      break;
  }

  atualizarPosicao();
  checarChaves();
  checarInimigos();
}