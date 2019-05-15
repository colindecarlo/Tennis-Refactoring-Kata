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

    score = this.playerOneAhead(score);
    score = this.playerTwoAhead(score);

    score = this.playerOneLeading(score);
    score = this.playerTwoLeading(score);

    if (this.P1point > this.P2point && this.P2point >= 3) {
      score = 'Advantage player1';
    }

    if (this.P2point > this.P1point && this.P1point >= 3) {
      score = 'Advantage player2';
    }

    if (this.P1point >= 4 && this.P2point >= 0 && (this.P1point - this.P2point) >= 2) {
      score = 'Win for player1';
    }
    if (this.P2point >= 4 && this.P1point >= 0 && (this.P2point - this.P1point) >= 2) {
      score = 'Win for player2';
    }
    return score;
  }

  private playerTwoLeading(score: string) {
    const player2points = this.P2point;
    const player1points = this.P1point;
    let player1res = this.P1res;
    let player2res = this.P2res;
    return this.pointsToWords(player2points, player1points, player2res, player1res, score);
  }

  private pointsToWords(player2points: number, player1points: number, player2res: string, player1res: string, score: string) {
    if (player2points > player1points && player2points < 4) {
      if (player2points === 2)
        player2res = 'Thirty';
      if (player2points === 3)
        player2res = 'Forty';
      if (player1points === 1)
        player1res = 'Fifteen';
      if (player1points === 2)
        player1res = 'Thirty';
      score = player1res + '-' + player2res;
    }
    return score;
  }

  private playerOneLeading(score: string) {
    if (this.P1point > this.P2point && this.P1point < 4) {
      if (this.P1point === 2)
        this.P1res = 'Thirty';
      if (this.P1point === 3)
        this.P1res = 'Forty';
      if (this.P2point === 1)
        this.P2res = 'Fifteen';
      if (this.P2point === 2)
        this.P2res = 'Thirty';
      score = this.P1res + '-' + this.P2res;
    }
    return score;
  }

  private playerTwoAhead(score: string) {
    if (this.P2point > 0 && this.P1point === 0) {
      if (this.P2point === 1)
        this.P2res = 'Fifteen';
      if (this.P2point === 2)
        this.P2res = 'Thirty';
      if (this.P2point === 3)
        this.P2res = 'Forty';
      this.P1res = 'Love';
      score = this.P1res + '-' + this.P2res;
    }
    return score;
  }

  private playerOneAhead(score: string) {
    if (this.P1point > 0 && this.P2point === 0) {
      if (this.P1point === 1)
        this.P1res = 'Fifteen';
      if (this.P1point === 2)
        this.P1res = 'Thirty';
      if (this.P1point === 3)
        this.P1res = 'Forty';
      this.P2res = 'Love';
      score = this.P1res + '-' + this.P2res;
    }
    return score;
  }

  private getScoreForTiedGame(score: string) {
    if (this.isGameTied() && this.P1point < 4) {
      if (this.P1point === 0)
        score = 'Love';
      if (this.P1point === 1)
        score = 'Fifteen';
      if (this.P1point === 2)
        score = 'Thirty';
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
