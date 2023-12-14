import { DayOfWeek } from './day-of-week.model';

export class Training {
  public createdBy?: number;
  public createdOn?: Date;
  public description?: string;
  public hasStretching?: boolean;
  public hasWarpUp?: boolean;
  public id?: any;
  public isActive?: boolean;
  public lastUpdatedBy?: number;
  public lastUpdatedOn?: Date;
  public name?: string;
  public sportPreset?: string;
  public trainingDays?: DayOfWeek[];
}
