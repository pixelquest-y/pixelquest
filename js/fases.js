function mostrarVitoria() {
  // Esconder a tela de game over (se estiver aberta)
  document.getElementById('game-over').style.display = 'none';

  // Mostrar tela de vitória
  document.getElementById('tela-vitoria').style.display = 'flex';
}

function reiniciarFase() {
  // Esconde a tela de vitória (se aberta)
  document.getElementById('tela-vitoria').style.display = 'none';

  resetarFaseCompleta(); // Função que reinicia tudo
}

function proximaFase() {
  const faseAtual = window.location.pathname.match(/fase(\d)\.html/);
  if (faseAtual) {
    const proximaFase = parseInt(faseAtual[1]) + 1;
    window.location.href = `../html/fase${proximaFase}.html`;
  } else {
    console.error("Fase atual não detectada!");
  }
}
