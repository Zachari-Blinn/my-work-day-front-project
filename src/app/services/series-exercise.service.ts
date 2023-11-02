import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";

const baseUrl = 'http://localhost:8090/api/v1/series-exercises';

@Injectable({
  providedIn: 'root'
})
export class SeriesExerciseService {
  
  public constructor(private http: HttpClient) { }
  
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public create(data: any): Observable<any> {
    return this.http.post(baseUrl, data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  
  public handleError(error: { error: { message: string; }; status: any; message: any; }) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(() => {
        return errorMessage;
      });
    }
}