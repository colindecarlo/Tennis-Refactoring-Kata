import { Player } from './Player';
import { Scenario } from './Scenario';

export class TieGame implements Scenario {

    player: Player;
    opponent: Player;
  
    constructor(player: Player, opponent: Player) {
      this.player = player;
      this.opponent = opponent;
    }
  
    applies() {
      return this.player.isTiedWith(this.opponent);
    }
  
    score() {
      if (this.player.points >= 3) {
        return 'Deuce';
      }
      return `${this.player.score}-All`;
    }
  }