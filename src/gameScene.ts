import { Scene } from "./sceneManager.js";
import { Player } from "./player.js";

export class GameScene implements Scene {
  enter(): void {
    console.log("Entering game scene");

    // add transition
  }

  update(): void {
    console.log("Updating game scene");
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // platform
    const platformHeight = 50; //?
    ctx.fillStyle = "gray";
    ctx.fillRect(0, ctx.canvas.height - platformHeight, ctx.canvas.width, platformHeight);


    // debug
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game scene in Progress", 200, 200);
    ctx.fillText(`width: ${ctx.canvas.width} height: ${ctx.canvas.height}`, 200, 250);
  }

  exit(): void {
    console.log("Exiting game scene");
  }
}
