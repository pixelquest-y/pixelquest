function tremerTela() {
  document.body.classList.add('tremor');
  setTimeout(() => {
    document.body.classList.remove('tremor');
  }, 500);
}

setTimeout(() => {
  document.getElementById('game-over').style.display = 'flex';
}, 300);