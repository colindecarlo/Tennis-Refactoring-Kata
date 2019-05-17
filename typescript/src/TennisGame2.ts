import { TennisGame } from './TennisGame';
import { SSL_OP_CRYPTOPRO_TLSEXT_BUG } from 'constants';


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
    if (this.player1.isTied(this.player2)) {
      if (this.player1.points >= 3) {
        return 'Deuce';
      }
      return `${this.gameScoreToWord(this.player1.points)}-All`;
    }

    const leadingPlayer = this.player1.isLeading(this.player2) ? this.player1 : this.player2;

    
    const hasPlayerOneWon = new PlayerHasWon(this.player1, this.player2);
    if (hasPlayerOneWon.applies()) {
      return hasPlayerOneWon.score();
    }

    const hasPlayerTwoWon = new PlayerHasWon(this.player2, this.player1);
    if (hasPlayerTwoWon.applies()) {
      return hasPlayerTwoWon.score();
    }

    const playerOneHasAdvantage = new PlayerHasAdvantage(this.player1, this.player2);
    if (playerOneHasAdvantage.applies()) {
      return playerOneHasAdvantage.score();
    }
    
    const playerTwoHasAdvantage = new PlayerHasAdvantage(this.player2, this.player1);
    if (playerTwoHasAdvantage.applies()) {
      return playerTwoHasAdvantage.score();
    }

    return `${this.gameScoreToWord(this.player1.points)}-${this.gameScoreToWord(this.player2.points)}`;
  }


  private gameScoreToWord(score: number) {
    switch (score) {
      case 0:
        return 'Love';
      case 1:
        return 'Fifteen';
      case 2:
        return 'Thirty';
      case 3:
        return 'Forty';
    }
  }
}

class Player {
  points: number = 0;
  name: string;

  constructor(name: string) {
    this.name = name;
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

  hasWon(opponent: Player): boolean {
    return this.points >= 4 && this.points - opponent.points >= 2;
  }

  hasAdvantage(opponent: Player): boolean {
    return this.isLeading(opponent) && opponent.points >= 3
  }
}

class PlayerHasWon {

  player: Player;
  opponent: Player;

  constructor(player: Player, opponent: Player) {
    this.player = player;
    this.opponent = opponent;
  }

  applies() {
    return this.player.hasWon(this.opponent);
  }

  score() {
    return `Win for ${this.player.name}`;
  }
}

class PlayerHasAdvantage {

  player: Player;
  opponent: Player;

  constructor(player: Player, opponent: Player) {
    this.player = player;
    this.opponent = opponent;
  }

  applies() {
    return this.player.hasAdvantage(this.opponent);
  }

  score() {
    return `Advantage ${this.player.name}`;
  }
}

class TieGame {

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
    return `${this.gameScoreToWord(this.player.points)}-All`;
  }

  private gameScoreToWord(score: number) {
    switch (score) {
      case 0:
        return 'Love';
      case 1:
        return 'Fifteen';
      case 2:
        return 'Thirty';
      case 3:
        return 'Forty';
    }
  }
}