import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://springboot-api-qn8w.onrender.com/api/hello';

  constructor(private http: HttpClient) { }

  getHello(): Observable<string> {
    return this.http.get(this.apiUrl, { 
      responseType: 'text',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain, application/json'
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
      
      if (error.status === 0) {
        errorMessage = 'Network Error: Unable to connect to API. Check CORS settings.';
      }
    }
    
    console.error('API Error Details:', error);
    return throwError(() => new Error(errorMessage));
  }
}