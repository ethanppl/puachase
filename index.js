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

const getBall = ({ballX, ballY, ballFile}) => {
  const ball = document.createElement('div');

  ball.id = 'ball';

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  ball.style.width = "20px";
  ball.style.height = "20px";
  ball.style.position = "fixed";

  ball.style.zIndex = "1";
  ball.style.backgroundImage = `url(${ballFile})`;

  return ball;
}

const init = () => {
  // Global variables to keep track of
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let puaX = 20;
  let puaY = 20;

  // Params
  const SPEED = 0.05;
  const puaFile = "./pua-sitting.png";
  const ballFile = "./ball.png";

  // Assets
  const pua = getPua({puaX, puaY, puaFile});
  const ball = getBall({ballX: mouseX, ballY: mouseY, ballFile});

  const animate = () => {
    // Y axis: feet stick to the mouse
    const diffY = mouseY - puaY - 40;
    const transformY = diffY * SPEED;
    puaY += transformY;

    // X axis: body sit next to the mouse
    const diffX = mouseX > puaX ? mouseX - puaX - 40 : mouseX - puaX;
    const transformX = diffX * SPEED;
    puaX += transformX;

    pua.style.left = `${puaX}px`;
    pua.style.top = `${puaY}px`;

    window.requestAnimationFrame(animate);
  }

  document.body.appendChild(pua);
  document.body.appendChild(ball);

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY; 

    ball.style.left = `${event.clientX - 10}px`;
    ball.style.top = `${event.clientY - 10}px`;
  });

  window.requestAnimationFrame(animate);
}

window.onload = init;