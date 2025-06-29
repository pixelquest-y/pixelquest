let chavesColetadas = 0;

function checarChaves() {
  chaves.forEach((chave, index) => {
    if (chave.style.display !== 'none' && colisao(player, chave)) {
      chave.style.display = 'none';
      chavesColetadas++;

      function animarChave(chave) {
        chave.style.transition = 'transform 0.3s, opacity 0.3s';
        chave.style.transform = 'scale(1.5)';
        chave.style.opacity = '0';
        setTimeout(() => chave.style.display = 'none', 300);
      }

      VolumeControl.tocarSom("som-chave");

      const chaveIcon = document.getElementById(`chave-${chavesColetadas}`);
      if (chaveIcon) chaveIcon.classList.add('coletada');

      document.getElementById("numero-chaves").innerText = chavesColetadas;

      // Novo jeito que funciona em qualquer fase:
      const totalChaves = document.querySelectorAll('.chave').length;
      if (chavesColetadas === totalChaves) {
        window.removeEventListener('keydown', controle);
        mostrarVitoria();
      }
    }
  });
}