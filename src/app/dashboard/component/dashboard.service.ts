import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "src/shared/grid/component/movie";
import { MovieService } from "src/shared/service/movie.service";

@Injectable()
export class DashboardService {

    constructor(private movieService: MovieService) { }

    getBestMovies(): Observable<Movie[]> {
        return this.movieService.getAllMovies().pipe(map(allMovies => {
            return allMovies.movies.slice(5, 20).map(m => new Movie(m));
        }));
    }
}