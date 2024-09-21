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
  let mouseY = 20;
  let puaX = 20;
  let puaY = 20;

  // Params
  const SPEED = 0.1;
  const puaFile = "./pua-sitting.png";

  // Assets
  const pua = getPua({puaX, puaY, puaFile});

  const animate = () => {
    const diffX = mouseX - puaX - 20;
    const diffY = mouseY - puaY - 20;

    const transformX = diffX * SPEED;
    const transformY = diffY * SPEED;

    puaX += transformX;
    puaY += transformY;
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