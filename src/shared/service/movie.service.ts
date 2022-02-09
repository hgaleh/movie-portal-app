import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "../grid/component/movie";
import { Genre } from "../model/genre";
import { MovieDTO } from "../model/movie.dto";
import { genreMatch } from "../utility/genre-match";

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private movieList$ = new BehaviorSubject<Movie[]>([]);

    constructor(private httpClient: HttpClient) {
        this.getAllMovies().subscribe(movies => {
            this.movieList$.next(
                movies.movies.map(mov => new Movie(mov))
            );
        });
    }

    getGenreList(): Observable<Genre[]> {
        return this.getAllMovies().pipe(map(d => d.genres));
    }

    getMovies(): Observable<Movie[]> {
        return this.movieList$.asObservable();
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
        movies: MovieDTO[]
    }> {
        return this.httpClient.get<{
            genres: Genre[],
            movies: MovieDTO[]
        }>('/assets/data.json');
    }
}