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

  // Constants: easier to change the size of the elements if needed
  const PUA_WIDTH = 40;
  const PUA_HEIGHT = 40;
  const puaFile = "./pua-sitting.png";

  const BALL_WIDTH = 100;
  const BALL_HEIGHT = 100;
  const BALL_IMAGE_WIDTH = 20;
  const BALL_IMAGE_HEIGHT = 20;
  const ballFile = "./ball.png";

  const getPua = ({puaX, puaY, puaFile}) => {
    // Pua Image
    const pua = document.createElement('div');
    pua.id = 'pua';

    // Fixed position in the page
    pua.style.position = "fixed";
    pua.style.left = `${puaX}px`;
    pua.style.top = `${puaY}px`;
    pua.style.width = `${PUA_WIDTH}px`;
    pua.style.height = `${PUA_HEIGHT}px`;

    // Higher z-index than the default
    pua.style.zIndex = "10";
    pua.style.backgroundImage = `url(${puaFile})`;

    return pua;
  }

  const getBall = ({ballX, ballY, ballFile}) => {
    // Ball Image
    const ball = document.createElement('div');
    ball.id = 'ball';

    // Relative within the ball container
    ball.style.position = "relative";
    ball.style.width = `${BALL_IMAGE_WIDTH}px`;
    ball.style.height = `${BALL_IMAGE_HEIGHT}px`;

    // Higher z-index than pua
    ball.style.zIndex = "20";
    ball.style.backgroundImage = `url(${ballFile})`;

    // Ball Container for better dragging
    const ballContainer = document.createElement('div');
    ballContainer.id = 'ball-container';

    // Fixed position in the page
    ballContainer.style.position = "fixed";
    ballContainer.style.left = `${ballX - (BALL_WIDTH / 2)}px`;
    ballContainer.style.top = `${ballY - (BALL_HEIGHT / 2)}px`;
    ballContainer.style.width = `${BALL_WIDTH}px`;
    ballContainer.style.height = `${BALL_HEIGHT}px`;

    // Center the ball image within the container
    ballContainer.style.display = "flex";
    ballContainer.style.justifyContent = "center";
    ballContainer.style.alignItems = "center";

    // Higher z-index than pua and put the ball image inside
    ballContainer.style.zIndex = "20";
    ballContainer.appendChild(ball);

    return ballContainer;
  }

  // Assets
  const pua = getPua({puaX, puaY, puaFile});
  const ball = getBall({ballX, ballY, ballFile});

  const animate = () => {
    // X axis: body sit next to the ball
    const diffX = ballX > puaX ? ballX - puaX - PUA_WIDTH : ballX - puaX;
    const transformX = diffX * SPEED;
    puaX += transformX;

    // Y axis: feet stick to the mouse
    const diffY = ballY - puaY - PUA_HEIGHT;
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
    ball.style.left = `${ballX - (BALL_WIDTH / 2)}px`;
    ball.style.top = `${ballY - (BALL_HEIGHT / 2)}px`;
  });

  // Prevent default behaviour in drag and drop
  ball.ondragstart = () => false;

  // Mobile: drag and drop
  ball.ontouchmove = (event) => {
    // Smoother dragging on mobile
    event.preventDefault();

    mouseX = event.touches[0].clientX;
    mouseY = event.touches[0].clientY;

    ballX = mouseX;
    ballY = mouseY;
    ball.style.left = `${ballX - (BALL_WIDTH / 2)}px`;
    ball.style.top = `${ballY - (BALL_HEIGHT / 2)}px`;
  }

  window.requestAnimationFrame(animate);
}

window.onload = init;