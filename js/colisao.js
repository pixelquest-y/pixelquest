function colisao(el1, el2) {
  const r1 = {
    top: el1.offsetTop,
    left: el1.offsetLeft,
    right: el1.offsetLeft + el1.offsetWidth,
    bottom: el1.offsetTop + el1.offsetHeight
  };

  const r2 = {
    top: el2.offsetTop,
    left: el2.offsetLeft,
    right: el2.offsetLeft + el2.offsetWidth,
    bottom: el2.offsetTop + el2.offsetHeight
  };

  return !(r1.bottom < r2.top ||
           r1.top > r2.bottom ||
           r1.right < r2.left ||
           r1.left > r2.right);
}