export class Player {
  private _name: string;
  private _completedTasks: number;
  private _totalScore: number;
  private _energy: number;
  private _money: number;
  private _inventory: string[];

  constructor(name: string) {
    this._name = name;
    this._completedTasks = 0;
    this._totalScore = 0;
    this._energy = 100;
    this._money = 0;
    this._inventory = [];
  }

  get name(): string {
    return this._name;
  }

  get completedTasks(): number {
    return this._completedTasks;
  }

  completeTask(score: number): void {
    this._completedTasks++;
  }

  get energy(): number {
    return this._energy;
  }

  get totalScore(): number {
    return this._totalScore;
  }

  addScore(score: number): void {
    if (score < 0) throw new Error("Score can't be negative.");
    this._totalScore += score;
  }

  adjustEnergy(amount: number): void {
    this._energy = Math.min(100, Math.max(0, this._energy + amount));
  }

  get money(): number {
    return this._money;
  }

  adjustMoney(amount: number): void {
    if (this._money + amount < 0) throw new Error("Insufficient funds!");
    this._money += amount;
  }

  get inventory(): string[] {
    return [...this._inventory];
  }

  addToInventory(item: string): void {
    this._inventory.push(item);
  }
}

