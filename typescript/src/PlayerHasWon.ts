import { Player } from './Player';
import { Scenario } from './Scenario';

export class PlayerHasWon implements Scenario {

    player: Player;
    opponent: Player;
  
    constructor(player: Player, opponent: Player) {
      this.player = player;
      this.opponent = opponent;
    }
  
    applies() {
      return this.player.hasDefeated(this.opponent);
    }
  
    score() {
      return `Win for ${this.player.name}`;
    }
  }