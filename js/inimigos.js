function checarInimigos() {
  const inimigosNormais = document.querySelectorAll('.inimigo');
  const inimigosCaverna = document.querySelectorAll('.inimigoCaverna');

  // Checar colisão com inimigos normais
  for (const inimigo of inimigosNormais) {
    if (colisao(player, inimigo)) {
      jogoAtivo = false;
      mortePlayer();
      VolumeControl.tocarSom("som-colisao");
      setTimeout(() => {
        document.getElementById('game-over').style.display = 'flex';
      }, 800);
      return;
    }
  }

  document.querySelectorAll('.inimigo, .inimigoCaverna').forEach(inimigo => {
  inimigo.setAttribute('data-top-inicial', inimigo.style.top);
  inimigo.setAttribute('data-left-inicial', inimigo.style.left);
});

  // Checar colisão com inimigosCaverna
  for (const inimigo of inimigosCaverna) {
    if (colisao(player, inimigo)) {
      jogoAtivo = false;
      mortePlayer();
      VolumeControl.tocarSom("som-colisao");
      setTimeout(() => {
        document.getElementById('game-over').style.display = 'flex';
      }, 800);
      return;
    }
  }

  return false;
}

// Animação de respiração para inimigos normais
document.querySelectorAll('.inimigo').forEach(inimigo => {
  inimigo.classList.add('respirando');
});

function danoPlayer() {
  player.classList.add('dano');
  setTimeout(() => player.classList.remove('dano'), 900); // pisca 3 vezes
}

function mortePlayer() {
  player.classList.add('morrer');
  jogoAtivo = false; // trava o jogo enquanto morre
  setTimeout(() => {
    document.getElementById('game-over').style.display = 'flex';
  }, 800); // espera animação de morte
}