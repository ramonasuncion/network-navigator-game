import { SceneManager } from './sceneManager.js';
import { MenuScene } from './menuScene.js';
import { GameScene } from './gameScene.js';

('use strict');

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const sceneManager = new SceneManager();

if (typeof window !== 'undefined') {
  window.onload = () => {
    initializeCanvas();
    initializeScenes();
    startGameLoop();
  };
}

function initializeCanvas(): void {
  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d')!;
  resizeCanvas();

  window.addEventListener('resize', resizeCanvas, false);
}

function resizeCanvas(): void {
  if (!canvas) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  //const dpr = window.devicePixelRatio;

  //canvas.width = width * dpr;
  //canvas.height = height * dpr;

  //ctx.scale(dpr, dpr);

  //ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  //canvas.style.width = `${width}px`;
  //canvas.style.height = `${height}px`;
}

function initializeScenes(): void {
  const menuScene = new MenuScene(sceneManager, canvas);
  const gameScene = new GameScene();

  sceneManager.registerScene('menu', menuScene);
  sceneManager.registerScene('game', gameScene);

  // focusing on actual mechanics now
  sceneManager.switchSceneByName('game');
  //sceneManager.switchSceneByName('menu');
}

function startGameLoop(): void {
  function gameLoop(): void {
    sceneManager.update();
    sceneManager.render(ctx);
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
