const getPua = ({puaX, puaY, puaFile}) => {
  const pua = document.createElement('div');

  pua.id = 'pua';

  pua.style.left = `${puaX}px`;
  pua.style.top = `${puaY}px`;

  pua.style.width = "40px";
  pua.style.height = "40px";
  pua.style.position = "fixed";

  pua.style.zIndex = "1";
  pua.style.backgroundImage = `url(${puaFile})`;

  return pua;
}

const init = () => {
  // Global variables to keep track of
  let mouseX = 20;
  let mouseY = 60;
  let puaX = 20;
  let puaY = 20;

  // Params
  const SPEED = 0.05;
  const puaFile = "./pua-sitting.png";

  // Assets
  const pua = getPua({puaX, puaY, puaFile});

  const animate = () => {
    // Y axis: feet stick to the mouse
    const diffY = mouseY - puaY - 40;
    const transformY = diffY * SPEED;
    puaY += transformY;

    // X axis: body sit next to the mouse
    const diffX = mouseX - puaX - 20;
    const transformX = diffX * SPEED;
    puaX = Math.abs(diffX) > 20 ? puaX + transformX : puaX;

    pua.style.left = `${puaX}px`;
    pua.style.top = `${puaY}px`;

    window.requestAnimationFrame(animate);
  }

  document.body.appendChild(pua);

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY; 
  });

  window.requestAnimationFrame(animate);
}

window.onload = init;