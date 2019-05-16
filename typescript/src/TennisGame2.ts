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
    const aPlayerIsInTheLead = this.P1point > this.P2point || this.P2point > this.P1point;
    const playerOneHasAdvantage = this.P1point > this.P2point && this.P2point >= 3
    const playerTwoHasAdvantage = this.P2point > this.P1point && this.P1point >= 3;
    const playerTwoHasWon = this.P2point >= 4 && this.P1point >= 0 && (this.P2point - this.P1point) >= 2;
    const playerOneHasWon = this.P1point >= 4 && this.P2point >= 0 && (this.P1point - this.P2point) >= 2;
    const gameIsTied = this.P1point === this.P2point;
    
    if (gameIsTied) {
      if (this.P1point >= 3) {
        return 'Deuce';
      }
      return `${this.gameScoreToWord(this.P1point)}-All`;
    }

    if (playerOneHasWon) {
      return 'Win for player1';
    }
    if (playerTwoHasWon) {
      return 'Win for player2';
    }

    if (playerOneHasAdvantage) {
      return 'Advantage player1';
    }

    if (playerTwoHasAdvantage) {
      return 'Advantage player2';
    }

    if (aPlayerIsInTheLead) {
      return `${this.gameScoreToWord(this.P1point)}-${this.gameScoreToWord(this.P2point)}`;
    }
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
