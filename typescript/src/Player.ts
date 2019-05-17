export class Player {
    points: number = 0;
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    get score(): string {
      return ['Love', 'Fifteen', 'Thirty', 'Forty'][this.points];
    }
  
    wonPoint() {
      this.points++;
    }
  
    isLeading(opponent: Player): boolean {
      return this.points > opponent.points;
    }
  
    isTiedWith(opponent: Player): boolean {
      return this.points === opponent.points;
    }
  
    hasDefeated(opponent: Player): boolean {
      return this.points >= 4 && this.points - opponent.points >= 2;
    }
  
    hasAdvantageOver(opponent: Player): boolean {
      return this.isLeading(opponent) && opponent.points >= 3
    }
  }