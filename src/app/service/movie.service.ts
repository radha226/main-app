import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = 'd5c672c5';

  constructor(private http: HttpClient) { }

  getMovieDetails(title: string): Observable<any> {
    if (!title.trim()) {
      // If the title is empty, return an empty result.
      return of(null);
    }
    return this.http.get(`${this.apiUrl}?apikey=${this.apiKey}&t=${title}`).pipe(
      catchError(error => {
        return of(null); 
      })
    );
  }
}
