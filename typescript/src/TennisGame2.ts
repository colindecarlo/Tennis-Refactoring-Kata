import { TennisGame } from './TennisGame';
import { Player } from './Player';
import { Scenario } from './Scenario';
import { PlayerHasWon } from './PlayerHasWon';
import { PlayerHasAdvantage } from './PlayerHasAdvantage';
import { TieGame } from './TieGame';
import { RegularPlay } from './RegularPlay';


export class TennisGame2 implements TennisGame {

  player1: Player;
  player2: Player;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  wonPoint(player: string): void {
    if (player === 'player1') {
      this.player1.wonPoint();
    }
    else {
      this.player2.wonPoint();
    }
  }

  getScore(): string {
    const scenarios: Scenario[] = [
      new TieGame(this.player1, this.player2),
      new PlayerHasWon(this.player1, this.player2),
      new PlayerHasWon(this.player2, this.player1),
      new PlayerHasAdvantage(this.player1, this.player2),
      new PlayerHasAdvantage(this.player2, this.player1),
      new RegularPlay(this.player1, this.player2)
    ];

    return scenarios.find(scenario => scenario.applies()).score();
  }
}