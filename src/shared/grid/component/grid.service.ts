import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Genre } from "../../model/genre";
import { MovieDTO } from "../../model/movie.dto";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs";
import { Movie } from "./movie";
import { MovieService } from "src/shared/service/movie.service";

@Injectable()
export class GridService {

    constructor(private movieService: MovieService) {}

    getMoviesPagable(pageIndex: number, pageSize: number): Observable<Movie[]> {
        return this.movieService.getAllMovies().pipe(map(all => {
            const start = pageIndex * pageSize;
            return all.movies.slice(start, start + pageSize - 1).map(m => new Movie(m))
        }))
    }
}