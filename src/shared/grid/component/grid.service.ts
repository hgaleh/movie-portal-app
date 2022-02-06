import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Genre } from "../../model/genre";
import { MovieDTO } from "../../model/movie.dto";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs";
import { Movie } from "./movie";
import { MovieService } from "src/shared/service/movie.service";
import { MovieApi } from "./movie-api";

@Injectable()
export class GridService {

    constructor(private movieService: MovieService) {}

    getMoviesPagable(): MovieApi {
        return (pageIndex: number, pageSize: number, keyword: string) => {
            return this.movieService.getAllMovies().pipe(map(all => {
                const start = pageIndex * pageSize;
                return all.movies.filter(movie => movie.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())).slice(start, start + pageSize - 1).map(m => new Movie(m))
            }))
        }
    }
}