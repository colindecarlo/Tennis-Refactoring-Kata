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
    let score: string = '';
    score = this.getScoreForTiedGame(score);
    
    const aPlayerIsInTheLead = this.P1point > this.P2point || this.P2point > this.P1point;
    const playerOneHasAdvantage = this.P1point > this.P2point && this.P2point >= 3
    const playerTwoHasAdvantage = this.P2point > this.P1point && this.P1point >= 3;
    const playerTwoHasWon = this.P2point >= 4 && this.P1point >= 0 && (this.P2point - this.P1point) >= 2;
    const playerOneHasWon = this.P1point >= 4 && this.P2point >= 0 && (this.P1point - this.P2point) >= 2;

    if (aPlayerIsInTheLead) {
      score = `${this.gameScoreToWord(this.P1point)}-${this.gameScoreToWord(this.P2point)}`;
    }

    if (playerOneHasAdvantage) {
      score = 'Advantage player1';
    }

    if (playerTwoHasAdvantage) {
      score = 'Advantage player2';
    }

    if (playerOneHasWon) {
      return 'Win for player1';
    }
    if (playerTwoHasWon) {
      return 'Win for player2';
    }
    return score;
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

  private getScoreForTiedGame(score: string) {
    if (this.isGameTied() && this.P1point < 4) {
      if (this.P1point === 0)
        score = this.gameScoreToWord(this.P1point);
      if (this.P1point === 1)
        score = this.gameScoreToWord(this.P1point);
      if (this.P1point === 2)
        score = this.gameScoreToWord(this.P1point);
      score += '-All';
    }
    if (this.isGameTied() && this.P1point >= 3) {
      score = 'Deuce';
    }
    return score;
  }

  private isGameTied() {
    return this.P1point === this.P2point;
  }
}
