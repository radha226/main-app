import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  title: string = '';
  movie: any;
  errorMessage: string = '';
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) { }

  
onSearch(term: string): void {
  this.searchTerms.next(term);
}
  handleSearchError(): void {
    this.movie = null;
    this.errorMessage = 'Movie not found';
  }
  
  
  fetchMovieDetails(): void {
    this.movieService.getMovieDetails(this.title).subscribe(
      data => {
        console.log("data", data)
        if (data && data.Response !== 'False') {
          this.movie = data;
          this.errorMessage = '';
          const iframe = document.getElementById('movieFrame') as HTMLIFrameElement;
           // iframe.src = `https://your-username.github.io/child-application/?title=${encodeURIComponent(data.Title)}&year=${data.Year}&plot=${encodeURIComponent(data.Plot)}&poster=${encodeURIComponent(data.Poster)}&genre=${encodeURIComponent(data.Genre)}&director=${encodeURIComponent(data.Director)}&actors=${encodeURIComponent(data.Actors)}&imdbRating=${data.imdbRating}&awards=${encodeURIComponent(data.Awards)}`;
           iframe.src = `http://localhost:53590?title=${encodeURIComponent(data.Title)}&year=${data.Year}&plot=${encodeURIComponent(data.Plot)}&poster=${encodeURIComponent(data.Poster)}&genre=${encodeURIComponent(data.Genre)}&director=${encodeURIComponent(data.Director)}&actors=${encodeURIComponent(data.Actors)}&imdbRating=${data.imdbRating}&awards=${encodeURIComponent(data.Awards)}&runtime=${encodeURIComponent(data.Runtime)}&type=${encodeURIComponent(data.Type)}`;
          } else {
          this.handleSearchError(); // Handle error
          const iframe = document.getElementById('movieFrame') as HTMLIFrameElement;
          // iframe.src = `https://your-username.github.io/child-application/?title=${encodeURIComponent(data.Title)}&year=${data.Year}&plot=${encodeURIComponent(data.Plot)}&poster=${encodeURIComponent(data.Poster)}&genre=${encodeURIComponent(data.Genre)}&director=${encodeURIComponent(data.Director)}&actors=${encodeURIComponent(data.Actors)}&imdbRating=${data.imdbRating}&awards=${encodeURIComponent(data.Awards)}`;
      
          iframe.src = ""
        }
      },
      error => {
        this.handleSearchError(); // Handle error
      }
    );
  }


  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.getMovieDetails(term).pipe(
        catchError(error => {
          this.errorMessage = 'Movie not found';
          return of(null);
        })
      ))
    ).subscribe(data => {
      if (data && data.Response !== 'False') {
        this.movie = data;
        this.errorMessage = '';
        const iframe = document.getElementById('movieFrame') as HTMLIFrameElement;
        // iframe.src = `https://your-username.github.io/child-application/?title=${encodeURIComponent(data.Title)}&year=${data.Year}&plot=${encodeURIComponent(data.Plot)}&poster=${encodeURIComponent(data.Poster)}&genre=${encodeURIComponent(data.Genre)}&director=${encodeURIComponent(data.Director)}&actors=${encodeURIComponent(data.Actors)}&imdbRating=${data.imdbRating}&awards=${encodeURIComponent(data.Awards)}`;
      
        iframe.src = `http://localhost:53590?title=${encodeURIComponent(data.Title)}&year=${data.Year}&plot=${encodeURIComponent(data.Plot)}&poster=${encodeURIComponent(data.Poster)}&genre=${encodeURIComponent(data.Genre)}&director=${encodeURIComponent(data.Director)}&actors=${encodeURIComponent(data.Actors)}&imdbRating=${data.imdbRating}&awards=${encodeURIComponent(data.Awards)}&runtime=${encodeURIComponent(data.Runtime)}&type=${encodeURIComponent(data.Type)}`;
      } else {
        this.movie = null;
        this.errorMessage = 'Movie not found.';
       
        const iframe = document.getElementById('movieFrame') as HTMLIFrameElement;
          // iframe.src = `https://your-username.github.io/child-application/?title=${encodeURIComponent(data.Title)}&year=${data.Year}&plot=${encodeURIComponent(data.Plot)}&poster=${encodeURIComponent(data.Poster)}&genre=${encodeURIComponent(data.Genre)}&director=${encodeURIComponent(data.Director)}&actors=${encodeURIComponent(data.Actors)}&imdbRating=${data.imdbRating}&awards=${encodeURIComponent(data.Awards)}`;
      
          iframe.src = ""
 
      }
    });
  }
}
