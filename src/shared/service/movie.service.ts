import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, shareReplay } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Genre } from "../model/genre";
import { Movie } from "../model/movie";
import { genreMatch } from "../utility/genre-match";

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    // Sole source of movies
    private movieList$ = new BehaviorSubject<Movie[]>([]);

    constructor(private httpClient: HttpClient) {
        this.getAllMovies().subscribe(movies => {
            this.movieList$.next(
                movies.movies
            );
        });
    }

    getGenreList(): Observable<Genre[]> {
        return this.getAllMovies().pipe(map(d => d.genres), shareReplay(1));
    }

    getMovies(): Observable<Movie[]> {
        return this.movieList$.asObservable();
    }

    getDecadeList(): Observable<number[]> {
        return this.getMovies().pipe(
            map(movies => movies.map(movie => Math.floor(Number(movie.year)/10) * 10)),
            map(decades => new Set(decades)),
            map(decades => Array.from(decades).sort((a, b) => a - b))
        )
    }

    updateMovie(movie: Movie): void {
        const index = this.movieList$.value.findIndex(m => m.id === movie.id);
        this.movieList$.next(
            this.movieList$.value.slice(0, index).
            concat([
                {...movie}
            ]).
            concat(this.movieList$.value.slice(index + 1, this.movieList$.value.length))
        );
    }

    getFavoriteMovies(genre?: Genre): Observable<Movie[]> {
        return this.movieList$.pipe(map(movies => movies.filter(movie => movie.isFavorite && genreMatch(movie, genre))))
    }

    getLaterMovies(genre?: Genre): Observable<Movie[]> {
        return this.movieList$.pipe(map(movies => movies.filter(movie => movie.isLater && genreMatch(movie, genre))))
    }

    private getAllMovies(): Observable<{
        genres: Genre[],
        movies: Movie[]
    }> {
        return this.httpClient.get<{
            genres: Genre[],
            movies: Movie[]
        }>('/assets/data.json');
    }
}