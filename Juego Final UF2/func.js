const roadarea = document.querySelector('.road');
let player = { step: 5, start: false }; // Añadimos start como false por defecto
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(ev) {
  keys[ev.key] = true;
}

function keyUp(ev) {
  keys[ev.key] = false;
}

function movelines() {
  let roadlines = document.querySelectorAll('.line');
  roadlines.forEach(function (item) {
    if (item.y >= 600) {
      item.y = item.y - 750;
    }
    item.y = item.y + player.step;
    item.style.top = item.y + 'px';
  });
}

function movevehicle(playercar) {
  let vehicles = document.querySelectorAll('.vehicle');
  let playercarboun = playercar.getBoundingClientRect(); // Bounding box del coche del jugador

  vehicles.forEach(function (item) {
    let othercarboun = item.getBoundingClientRect();

    // Comprobar colisión
    if (
      !(playercarboun.bottom < othercarboun.top ||
        playercarboun.top > othercarboun.bottom ||
        playercarboun.left > othercarboun.right ||
        playercarboun.right < othercarboun.left)
    ) {
      player.start = false; // Detener el juego
      setTimeout(() => {
        location.reload(); // Recargar la página después de 2 segundos
      }, 2000);
      return;
    }

    // Mover vehículos
    if (item.y > 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + 'px';
    }
    item.y = item.y + player.step;
    item.style.top = item.y + 'px';
  });
}

function playarea() {
  let playercar = document.querySelector('.car');
  let road = roadarea.getBoundingClientRect();

  if (player.start) {
    movelines();
    movevehicle(playercar); // Pasar la referencia de playercar a movevehicle()

    if (keys.ArrowUp && player.y > road.top + 100) {
      player.y = player.y - player.step;
    }
    if (keys.ArrowDown && player.y < road.bottom - 200) {
      player.y = player.y + player.step;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x = player.x - player.step;
    }
    if (keys.ArrowRight && player.x < road.width - 74) {
      player.x = player.x + player.step;
    }

    playercar.style.top = player.y + 'px';
    playercar.style.left = player.x + 'px';

    window.requestAnimationFrame(playarea);
  }
}

function init() {
  player.start = true;

  // Crear el coche del jugador
  let playercar = document.createElement('div');
  playercar.setAttribute('class', 'car');
  roadarea.appendChild(playercar);

  // Guardar posición inicial del coche
  player.x = playercar.offsetLeft;
  player.y = playercar.offsetTop;

  // Crear las líneas de la carretera
  for (let x = 0; x < 5; x++) {
    let roadlines = document.createElement('div');
    roadlines.setAttribute('class', 'line');
    roadlines.y = x * 150;
    roadlines.style.top = roadlines.y + 'px';
    roadarea.appendChild(roadlines);
  }

  // Crear los vehículos enemigos
  for (let x = 0; x < 4; x++) {
    let vehicle = document.createElement('div');
    vehicle.setAttribute('class', 'vehicle');
    vehicle.y = (x + 1) * -300;
    vehicle.style.top = vehicle.y + 'px';
    vehicle.style.left = Math.floor(Math.random() * 350) + 'px';
    roadarea.appendChild(vehicle);
  }

  // Iniciar el área de juego después de inicializar todo
  window.requestAnimationFrame(playarea);
}

// Inicializar el juego
init();
