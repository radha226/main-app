import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getMovieDetails(title: string): Observable<any> {
    if (!title.trim()) {
      return of(null);
    }
    return this.http.get(`${this.apiUrl}?apikey=${this.apiKey}&t=${title}`).pipe(
      catchError(error => {
        return of(null);
      })
    );
  }
}
