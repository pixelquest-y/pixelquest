function moverInimigosFase3() {
  const inimigosFase2 = document.querySelectorAll('.cenario .inimigo'); // só pega inimigos da fase2

  inimigosFase2.forEach(inimigo => {
    let direcao = parseInt(inimigo.getAttribute('data-direcao')) || 1;
    const movimento = inimigo.getAttribute('data-movimento');
    const velocidade = 2;

    let posX = parseInt(inimigo.style.left) || 0;
    let posY = parseInt(inimigo.style.top) || 0;

    if (movimento === 'horizontal') {
      posX += velocidade * direcao;
      if (posX <= 0 || posX >= 720) direcao *= -1;
      inimigo.style.left = posX + 'px';
    } else if (movimento === 'vertical') {
      posY += velocidade * direcao;
      if (posY <= 0 || posY >= 420) direcao *= -1;
      inimigo.style.top = posY + 'px';
    }

    inimigo.setAttribute('data-direcao', direcao);
  });
}

setInterval(moverInimigosFase3, 30);

const inimigosCaverna = document.querySelectorAll('.inimigoCaverna');

// Inimigos que perseguem o player
inimigosCaverna.forEach(inimigo => {
  setInterval(() => {
    if (!jogoAtivo) return;

    const playerRect = player.getBoundingClientRect();
    const inimigoRect = inimigo.getBoundingClientRect();

    const distanciaX = playerRect.left - inimigoRect.left;
    const distanciaY = playerRect.top - inimigoRect.top;

    const passo = 1.5; // velocidade menor para perseguidor

    if (Math.abs(distanciaX) > 5) { // margem de parada
      inimigo.style.left = (inimigo.offsetLeft + passo * Math.sign(distanciaX)) + 'px';
    }
    if (Math.abs(distanciaY) > 5) {
      inimigo.style.top = (inimigo.offsetTop + passo * Math.sign(distanciaY)) + 'px';
    }
  }, 50);
});