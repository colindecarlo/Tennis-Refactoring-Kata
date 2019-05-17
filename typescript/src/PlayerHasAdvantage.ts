import { Player } from './Player';
import { Scenario } from './Scenario';

export class PlayerHasAdvantage implements Scenario {

    player: Player;
    opponent: Player;
  
    constructor(player: Player, opponent: Player) {
      this.player = player;
      this.opponent = opponent;
    }
  
    applies() {
      return this.player.hasAdvantageOver(this.opponent);
    }
  
    score() {
      return `Advantage ${this.player.name}`;
    }
  }