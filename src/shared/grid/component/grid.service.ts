import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Genre } from "./genre";
import { Movie } from "./movie";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs";

@Injectable()
export class GridService {
    constructor(private httpClient: HttpClient) {}

    private getAllMovies(): Observable<{
        genres: Genre[],
        movies: Movie[]
    }> {
        return this.httpClient.get<{
            genres: Genre[],
            movies: Movie[]
        }>('/assets/data.json');
    }

    getMoviesPagable(pageIndex: number, pageSize: number): Observable<Movie[]> {
        return this.getAllMovies().pipe(map(all => {
            const start = pageIndex * pageSize;
            return all.movies.slice(start, start + pageSize - 1)
        }))
    }
}