import { TennisGame } from './TennisGame';


export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  P1res: string = '';
  P2res: string = '';

  wonPoint(player: string): void {
    if (player === 'player1')
      this.P1point++;
    else
      this.P2point++;
  }

  getScore(): string {
    const leadingPlayer = this.P1point > this.P2point ? 'player1' : 'player2';
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
      return `Win for ${leadingPlayer}`;
    }

    if (playerOneHasAdvantage || playerTwoHasAdvantage) {
      return `Advantage ${leadingPlayer}`;
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
