import { TennisGame } from './TennisGame';


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

class Player {
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

  isTied(opponent: Player): boolean {
    return this.points === opponent.points;
  }

  hasDefeated(opponent: Player): boolean {
    return this.points >= 4 && this.points - opponent.points >= 2;
  }

  hasAdvantageOver(opponent: Player): boolean {
    return this.isLeading(opponent) && opponent.points >= 3
  }
}

interface Scenario {
  applies(): boolean;
  score(): string;
}

class PlayerHasWon implements Scenario {

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

class PlayerHasAdvantage implements Scenario {

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

class TieGame implements Scenario {

  player: Player;
  opponent: Player;

  constructor(player: Player, opponent: Player) {
    this.player = player;
    this.opponent = opponent;
  }

  applies() {
    return this.player.isTied(this.opponent);
  }

  score() {
    if (this.player.points >= 3) {
      return 'Deuce';
    }
    return `${this.player.score}-All`;
  }
}

class RegularPlay implements Scenario {

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