import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "src/shared/model/movie";
import { Genre } from "src/shared/model/genre";
import { MovieService } from "src/shared/service/movie.service";
import { pagableShared } from "src/shared/utility/pagable-shared";

@Injectable()
export class FavoriteService {

    constructor(private movieService: MovieService) { }

    getFavoritesPagable(scroll$: Observable<void>, genre$: Observable<Genre>): Observable<Movie[]> {
        return pagableShared(
            scroll$,
            genre$,
            this.movieService.getMovies(),
            movie => !!movie.isFavorite
        )
    }
}
