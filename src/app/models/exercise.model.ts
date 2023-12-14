import { Muscle } from './muscle.model';

export class Exercise {
  public name?: string;
  public musclesUsed?: Muscle[];
  public createdBy?: number;
  public createdOn?: Date;
  public id?: any;
  public isActive?: boolean;
  public lastUpdatedBy?: number;
  public lastUpdatedOn?: Date;
}
