import { Component, OnInit } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { MovieService } from '../service/movie.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  title = '';
  movie: any;
  errorMessage = '';
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) {}

  onSearch(): void {
    this.searchTerms.next(this.title);
  }

  private handleSearchError(): void {
    this.movie = null;
    this.errorMessage = 'Movie not found';
    this.updateIframeSrc('');
  }

  private updateIframeSrc(src: string): void {
    const iframe = document.getElementById('movieFrame') as HTMLIFrameElement;
    iframe.src = src;
  }

  private setMovieData(data: any): void {
    if (data && data.Response !== 'False') {
      this.movie = data;
      this.errorMessage = '';
      this.updateIframeSrc(
        `${environment.childUrl}?title=${encodeURIComponent(data.Title)}&year=${data.Year}&plot=${encodeURIComponent(data.Plot)}&poster=${encodeURIComponent(data.Poster)}&genre=${encodeURIComponent(data.Genre)}&director=${encodeURIComponent(data.Director)}&actors=${encodeURIComponent(data.Actors)}&imdbRating=${data.imdbRating}&awards=${encodeURIComponent(data.Awards)}&runtime=${encodeURIComponent(data.Runtime)}&type=${encodeURIComponent(data.Type)}`
      );
    } else {
      this.handleSearchError();
    }
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => 
        this.movieService.getMovieDetails(term).pipe(
          catchError(error => {
            this.errorMessage = 'Movie not found';
            return of(null);
          })
        )
      )
    ).subscribe(data => this.setMovieData(data));
  }
}
