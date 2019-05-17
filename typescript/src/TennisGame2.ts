import { TennisGame } from './TennisGame';


export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  P1res: string = '';
  P2res: string = '';

  player1: Player;
  player2: Player;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  wonPoint(player: string): void {
    if (player === 'player1') {
      this.P1point++;
      this.player1.wonPoint();
    }
    else {
      this.P2point++;
      this.player1.wonPoint();
    }
  }

  getScore(): string {
    const leadingPlayer = this.P1point > this.P2point ? this.player1 : this.player2;
    const aPlayerIsAheadByMoreThanOnePoint = Math.abs(this.P2point - this.P1point) >= 2;

    const playerTwoHasWon = this.P2point >= 4 && aPlayerIsAheadByMoreThanOnePoint;
    const playerOneHasWon = this.P1point >= 4 && aPlayerIsAheadByMoreThanOnePoint;

    const playerOneHasAdvantage = this.P1point > this.P2point && this.P2point >= 3
    const playerTwoHasAdvantage = this.P2point > this.P1point && this.P1point >= 3;

    const gameIsTied = this.P1point === this.P2point;

    if (gameIsTied) {
      if (this.P1point >= 3) {
        return 'Deuce';
      }
      return `${this.gameScoreToWord(this.P1point)}-All`;
    }

    if (playerOneHasWon || playerTwoHasWon) {
      return `Win for ${leadingPlayer.name}`;
    }

    if (playerOneHasAdvantage || playerTwoHasAdvantage) {
      return `Advantage ${leadingPlayer.name}`;
    }

    return `${this.gameScoreToWord(this.P1point)}-${this.gameScoreToWord(this.P2point)}`;
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
}