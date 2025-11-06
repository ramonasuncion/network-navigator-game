import { Player } from "./player";

interface Tools {
  name: string;
  description: string;
  cost: number;
  effect: () => void;
}

// inventory system will be a backpack stripe
// with squares in front

// asset manager to handle the stripe for these?

export class Shop {
  tools: Tools[];

  constructor() {
    this.tools = [
      { name: "Revolt",  description: "Restore 50% energy!", cost: 50, effect: () => {} },
      { name: "Diagonistic Tool",  description: "Reveal a hint during puzzle.", cost: 75, effect: () => {} },
      { name: "Faster Crimpers",  description: "Reduce tasks time by 10%", cost: 50, effect: () => {} },
    ]
  }

  displayTools(): void {
    // fixme: printing to console for now
    console.log("Avaliable tools:\n");
    this.tools.forEach((tool, index) => {
      console.log(`${index + 1}. ${tool.name} - ${tool.description} (Cost: ${tool.cost})`);
    });
  }

  purshaseTool(player: Player, toolIndex: number): string {
    const tool = this.tools[toolIndex];
    if (player.money >= tool.cost) {
      player.adjustMoney(-tool.cost);
      player.addToInventory(tool.name);
      return `${tool.name} successfuly purshased!`
    } else {
      return "No sufficient funds!";
    }
  }
}

const player = new Player("Carlos");
// probably job titles too? like network assistant so
// on the dialog box i can put "Network Engineer" for the boss.
console.log(player.name);
console.log(player.money);
player.adjustMoney(100);
player.addScore(50);
player.adjustEnergy(-10);
player.addToInventory("Faster Crimpers");
console.log(player.money);
console.log(player.inventory);
