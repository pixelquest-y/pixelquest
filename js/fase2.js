function moverInimigosFase2() {
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

setInterval(moverInimigosFase2, 30);