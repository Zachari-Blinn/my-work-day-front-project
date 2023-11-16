import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://192.168.0.15:8081/api/exercise';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  
  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(BASE_URL, httpOptions);
  }
}