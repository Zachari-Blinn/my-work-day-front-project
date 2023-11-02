export class Series {
  public id?: any;
  public weight?: number;
  public restTime?: string;
  public notes?: string;
  public repsCount?: number;
  
  public difficulty?: Difficulty;
}

enum Difficulty {
  EASY,
  NORMAL,
  HARD
}