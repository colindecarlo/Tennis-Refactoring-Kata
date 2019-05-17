import { Player } from './Player';
import { Scenario } from './Scenario';

export class RegularPlay implements Scenario {

    player: Player;
    opponent: Player;
  
    constructor(player: Player, opponent: Player) {
      this.player = player;
      this.opponent = opponent;
    }
  
    applies() {
      return true;
    }
  
    score() {
      return `${this.player.score}-${this.opponent.score}`;
    }
  }