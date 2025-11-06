import { Scene, SceneManager } from "./sceneManager.js";
import { GameScene } from "./gameScene.js";

export class MenuScene implements Scene {
  private buttons: Rectangle[] = [];
  private hoveredButtonIndex: number = -1;

  constructor(private sceneManager: SceneManager, private canvas: HTMLCanvasElement) {}

  enter(): void {
    console.log("Entering main menu");
    this.initializeButtons();

    this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const pos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      this.onMouseEvent('mousemove', pos);
    });

    this.canvas.addEventListener('click', (event: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const pos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      this.onMouseEvent('click', pos);
    });
  }

  update(): void {
    console.log("Updating main menu");
    // hover effect and scene transition here
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.drawBackground(ctx);
    this.drawTitle(ctx);
    this.drawButtons(ctx);
  }

  exit(): void {
    console.log("Exiting main menu");
  }

  public onMouseEvent(type: 'mousemove' | 'click', pos: Point): void {
    // console.log(`Event: ${type}, Position: ${pos.x}, ${pos.y}`);
    if (type === 'mousemove') {
      this.hoveredButtonIndex = this.buttons.findIndex((button) =>
        this.isInsideRect(pos, button)
      );
    } else if (type === 'click' && this.hoveredButtonIndex !== -1) {
      const clickedButton = this.buttons[this.hoveredButtonIndex];
      this.handleButtonClick(clickedButton.text);
    }
  }

  private initializeButtons(): void {
    const dpr = window.devicePixelRatio;
    const buttonWidth = 200;
    const buttonHeight = 50;
    const spacing = 20;
    const centerX = this.canvas.width / 2;
    const startY = 300;

    const buttonLabels = ['Play', 'Options', 'Shop'];

    this.buttons = buttonLabels.map((text, index) => ({
      text,
      x: centerX - buttonWidth / 2,
      y: startY + index * (buttonHeight + spacing),
      width: buttonWidth,
      height: buttonHeight,
    }));
  }

  private drawBackground(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#2C2C2C";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  private drawTitle(ctx: CanvasRenderingContext2D): void {
    const dpr = window.devicePixelRatio;
    const centerX = ctx.canvas.width / (2 * dpr);
    const centerY = 200;
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 40px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Network Navigator", centerX, centerY);
  }

  private drawButtons(ctx: CanvasRenderingContext2D): void {
    const dpr = window.devicePixelRatio;
    const centerX = ctx.canvas.width / (2 * dpr);
    this.buttons.forEach((button, index) => {
      button.x = Math.floor(centerX - button.width / 2);
      const isHovered = index === this.hoveredButtonIndex;
      this.drawButton(ctx, button, isHovered);
    });
  }

  private drawButton(ctx: CanvasRenderingContext2D, button: Rectangle, isHovered: boolean): void {
    const dpr = window.devicePixelRatio;
    button.x = Math.floor(button.x);
    button.y = Math.floor(button.y);
    ctx.fillStyle = isHovered ? "#1E90FF" : "#4CAF50";
    ctx.fillRect(button.x, button.y, button.width, button.height);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = (2);
    ctx.strokeRect(button.x, button.y, button.width, button.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `${18}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
  }

  private isInsideRect(pos: Point, rect: Rectangle): boolean {
    return (
      pos.x > rect.x &&
        pos.x < rect.x + rect.width &&
        pos.y < rect.y + rect.height &&
        pos.y > rect.y
    );
  }

  private isInsideRect(pos: Point, rect: Rectangle): boolean {
  // my precious little hack to fudge the condition my precious, my precious
  const tolerance = 0.1;
    return (
      pos.x >= rect.x - tolerance &&
      pos.x <= rect.x + rect.width + tolerance &&
      pos.y >= rect.y - tolerance &&
      pos.y <= rect.y + rect.height + tolerance
    );
  }

  private handleButtonClick(buttonText: string): void {
    if (buttonText === "Play") {
      console.log("Clicked Play!");
      this.sceneManager.switchScene(new GameScene());
    } else if (buttonText === "Options") {
      console.log("Clicked Options!");
    } else if (buttonText === "Shop") {
      console.log("Clicked Shop");
    }
  }
}
