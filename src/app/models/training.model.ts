import { SeriesExercise } from "./series-exercise.model";

export class Training {
  public id?: any;
  public name?: string;
  public sportPreset?: string;
  public trainingDays?: string[];
  public description?: string;
  public hasWarpUp?: boolean;
  public hasStretching?: boolean;
  public createdOn?: Date;
  public lastUpdatedOn?: Date;
  public seriesExercises?: SeriesExercise[];
}