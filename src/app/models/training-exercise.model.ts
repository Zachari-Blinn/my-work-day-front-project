import { Exercise } from './exercise.model';
import { Series } from './series.model';
import { Training } from './training.model';

export interface TrainingExercise {
  id: number;
  notes?: string;
  numberOfWarmUpSeries?: number;
  parent?: number;
  trainingDay?: string;
  training: Training;
  exercise: Exercise;
  seriesList: Series[];
}
