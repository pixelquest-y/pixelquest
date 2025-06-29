// volume.js
const VolumeControl = (() => {
  const VOLUME_PADRAO = 0.3;
  const STORAGE_KEY = "volume";

  let volumeAtual = parseFloat(localStorage.getItem(STORAGE_KEY));
  if (isNaN(volumeAtual)) volumeAtual = VOLUME_PADRAO;

  function salvarVolume(valor) {
    volumeAtual = valor;
    localStorage.setItem(STORAGE_KEY, volumeAtual);
  }

  function aplicarVolume() {
    document.querySelectorAll("audio").forEach(audio => {
      audio.volume = volumeAtual;
    });
  }

  function criarSliderVolume({ container = document.body, posicao = {top:"10px", right:"10px"}, titulo = "Ajustar volume", callbackOnChange = null } = {}) {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "1";
    slider.step = "0.01";
    slider.value = volumeAtual;
    slider.title = titulo;

    slider.style.position = "fixed";
    slider.style.top = posicao.top;
    slider.style.right = posicao.right;
    slider.style.zIndex = "9999";
    slider.style.width = "150px";
    slider.style.height = "8px";
    slider.style.borderRadius = "5px";
    slider.style.background = `linear-gradient(90deg, #4CAF50 0%, #4CAF50 ${volumeAtual * 100}%, #ddd ${volumeAtual * 100}%, #ddd 100%)`;
    slider.style.outline = "none";
    slider.style.cursor = "pointer";

    function atualizarBarra(valor) {
      slider.style.background = `linear-gradient(90deg, #4CAF50 0%, #4CAF50 ${valor * 100}%, #ddd ${valor * 100}%, #ddd 100%)`;
    }

    slider.addEventListener("input", e => {
      const novoVolume = parseFloat(e.target.value);
      salvarVolume(novoVolume);
      aplicarVolume();
      atualizarBarra(novoVolume);
      if (callbackOnChange) callbackOnChange(novoVolume);
    });

    container.appendChild(slider);
    return slider;
  }

  function tocarSom(id) {
    const audio = document.getElementById(id);
    if (audio) {
      audio.volume = volumeAtual;
      audio.currentTime = 0;
      audio.play();
    }
  }

  document.addEventListener("DOMContentLoaded", aplicarVolume);

  return {
    get volume() {
      return volumeAtual;
    },
    set volume(valor) {
      salvarVolume(valor);
      aplicarVolume();
    },
    aplicarVolume,
    tocarSom,
    criarSliderVolume,
  };
})();