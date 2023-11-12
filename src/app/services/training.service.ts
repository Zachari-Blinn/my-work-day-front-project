import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../models/training.model';

const BASE_URL = 'http://localhost:8081/api/training';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  
  constructor(private http: HttpClient) { }

  public create(data: Training): Observable<any> {
    return this.http.post(BASE_URL, data, httpOptions);
  }
}