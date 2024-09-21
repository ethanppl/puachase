const getPua = ({puaX, puaY, puaFile}) => {
  const pua = document.createElement('div');

  pua.id = 'pua';

  pua.style.left = `${puaX}px`;
  pua.style.top = `${puaY}px`;

  pua.style.width = "40px";
  pua.style.height = "40px";
  pua.style.position = "fixed";

  pua.style.zIndex = "10";
  pua.style.backgroundImage = `url(${puaFile})`;

  return pua;
}

const getBall = ({ballX, ballY, ballFile}) => {
  const ball = document.createElement('div');

  ball.id = 'ball';

  ball.style.left = `${ballX - 10}px`;
  ball.style.top = `${ballY - 10}px`;

  ball.style.width = "20px";
  ball.style.height = "20px";
  ball.style.position = "fixed";

  ball.style.zIndex = "20";
  ball.style.backgroundImage = `url(${ballFile})`;

  return ball;
}

const init = () => {
  // Global variables to keep track of
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ballX = mouseX;
  let ballY = mouseY;
  let puaX = 20;
  let puaY = 20;

  // Params
  const SPEED = 0.05;
  const puaFile = "./pua-sitting.png";
  const ballFile = "./ball.png";

  // Assets
  const pua = getPua({puaX, puaY, puaFile});
  const ball = getBall({ballX, ballY, ballFile});

  const animate = () => {
    // X axis: body sit next to the ball
    const diffX = ballX > puaX ? ballX - puaX - 40 : ballX - puaX;
    const transformX = diffX * SPEED;
    puaX += transformX;

    // Y axis: feet stick to the mouse
    const diffY = ballY - puaY - 40;
    const transformY = diffY * SPEED;
    puaY += transformY;

    pua.style.left = `${puaX}px`;
    pua.style.top = `${puaY}px`;

    window.requestAnimationFrame(animate);
  }

  document.body.appendChild(pua);
  document.body.appendChild(ball);

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY; 

    ballX = mouseX;
    ballY = mouseY;
    ball.style.left = `${ballX - 10}px`;
    ball.style.top = `${ballY - 10}px`;
  });

  // Prevent default behaviour in drag and drop
  ball.ondragstart = () => false;

  // Mobile: drag and drop
  ball.ontouchmove = (event) => {
    mouseX = event.touches[0].clientX;
    mouseY = event.touches[0].clientY;

    ballX = mouseX;
    ballY = mouseY;
    ball.style.left = `${ballX - 10}px`;
    ball.style.top = `${ballY - 10}px`;
  }

  window.requestAnimationFrame(animate);
}

window.onload = init;