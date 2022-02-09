import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "src/shared/grid/component/movie";
import { Genre } from "src/shared/model/genre";
import { MovieService } from "src/shared/service/movie.service";
import { getFavoritesPagable } from "src/shared/utility/pagable-shared";

@Injectable()
export class FavoriteService {

    constructor(private movieService: MovieService) { }

    getFavoritesPagable(scroll$: Observable<void>, genre$: Observable<Genre>): Observable<Movie[]> {
        return getFavoritesPagable(
            scroll$,
            genre$,
            this.movieService.getMovies(),
            movie => !!movie.isFavorite
        )
    }
}
