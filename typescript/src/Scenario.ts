export interface Scenario {
  applies(): boolean;
  score(): string;
}