import { Component } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "src/shared/grid/component/movie";
import { MovieService } from "src/shared/service/movie.service";

@Component({
    templateUrl: './favorite.component.html',
    styleUrls: [ './favorite.component.scss' ]
})
export class FavoriteComponent {
    readonly gridData$: Observable<Movie[]>;
    constructor(service: MovieService) {
        this.gridData$ = service.getFavoriteMovies();
    }
}
