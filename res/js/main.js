import { Cursor, Score, KDA, HP, Bombs, Background } from "./ui/ui.js";
import { Entity } from "./entities/entity.js";


const background = new Background();
const cursor = new Cursor();
const bombs = new Bombs();
const score = new Score();
const kda = new KDA();
const hp = new HP();


const collisionObjects = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const times = [];
let fps;

const keys = {};
let mouseX;
let mouseY;

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

document.addEventListener("mousemove", (e) => {
  const canvasPos = canvas.getBoundingClientRect();
  mouseX = (canvas.width / 100) * (((e.clientX - canvasPos.left) / (window.innerWidth - canvasPos.left * 2) / 100) * 10000);
  mouseY = (canvas.height / 100) * (((e.clientY - canvasPos.top) / (window.innerHeight - canvasPos.top * 2) / 100) * 10000);
});

const gameLoop = () => {
  //1. Meni velikost canvasu
  updateCanvasSize();

  //2. Prebarvime canvas
  clearCanvas();

  //3. Update
  updateAll();

  //4. Render
  render();

  calculateFps();

  //5. Dalsi snimek
  window.requestAnimationFrame(gameLoop);
};

const updateCanvasSize = () => {
  canvas.width = 1280;
  canvas.height = 720;
};

const clearCanvas = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const updateAll = () => {
  detectCollisionForCursor();
};

const render = () => {
  renderEntities();
  background.draw(ctx, canvas);
  score.draw(ctx, canvas);
  bombs.draw(ctx, canvas);
  kda.draw(ctx, canvas);
  hp.draw(ctx, canvas);
  renderCursor();
};

const renderEntities = () => {
  collisionObjects.forEach((object) => {
    object.draw(ctx);
  });
}

const renderCursor = () => {
  cursor.draw(ctx, mouseX, mouseY);
};

const calculateFps = () => {
  const now = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  fps = times.length;
  ctx.fillStyle = "black";
  ctx.font = "50px VT323";
  ctx.fillText(fps, 50, 50);
};

const detectCollisionForCursor = () => {
  collisionObjects.forEach((object) => {
    if (
      object.x < cursor.x + cursor.size.width &&
      object.x + object.size.width > cursor.x &&
      object.y < cursor.y + cursor.size.height &&
      object.y + object.size.height > cursor.y 
      ) {
      // collision
      console.log("collision");
      object.c = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    } else {
      // no collision
    }
  });
};

const rn = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

const spawnEntities = (numberOfEntities) => {
  for (let i = 0; i < numberOfEntities; i++) {
    collisionObjects.push(new Entity(rn(0, canvas.width), rn(0, canvas.height), rn(10, 20), rn(10, 20), `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`));
  }
}

window.onload = () => {
  updateCanvasSize();
  //spawnEntities(100);
  window.requestAnimationFrame(gameLoop);
};
