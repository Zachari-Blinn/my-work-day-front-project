import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../models/training.model';
import { TrainingExercise } from '../models/training-exercise.model';
import { environment } from 'environment';

const BASE_URL = `${environment.BASE_URL}/training`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) {}

  public create(data: Training): Observable<any> {
    return this.http.post(BASE_URL, data, httpOptions);
  }

  public getCurrentUserTrainings(): Observable<any> {
    return this.http.get(BASE_URL + '/current-user', httpOptions);
  }

  public getTraining(trainingId: Training['id']): Observable<any> {
    return this.http.get(BASE_URL + '/' + trainingId, httpOptions);
  }

  public addExercise(
    trainingId: Training['id'],
    data: TrainingExercise
  ): Observable<any> {
    return this.http.post(
      BASE_URL + '/' + trainingId + '/add-exercise',
      data,
      httpOptions
    );
  }

  public getTemplateExercisesByTrainingId(
    trainingId: Training['id']
  ): Observable<any> {
    return this.http.get(
      BASE_URL + '/' + trainingId + '/exercises' + '?fetchTemplate=true',
      httpOptions
    );
  }

  public validateTraining(
    trainingId: Training['id'],
    data: any
  ): Observable<any> {
    return this.http.post(
      BASE_URL + '/' + trainingId + '/validate',
      data,
      httpOptions
    );
  }

  public modifyBeforeValidateTraining(
    trainingId: Training['id'],
    data: TrainingExercise[]
  ): Observable<any> {
    return this.http.post(
      BASE_URL + '/' + trainingId + '/modify-before-validate',
      data,
      httpOptions
    );
  }
}
