import { Series } from "./series.model";

export class TrainingExercise {
  public id?: TrainingExerciseKey;
  public exerciseId?: number;
  public numberOfWarmUpSeries?: number;
  public notes?: string;
  public series?: Series[];
}

export class TrainingExerciseKey {
  public trainingId?: number;
  public exerciseId?: number;
}