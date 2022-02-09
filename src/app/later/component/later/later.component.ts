import { Component } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "src/shared/grid/component/movie";
import { MovieService } from "src/shared/service/movie.service";

@Component({
    templateUrl: './later.component.html',
    styleUrls: [ './later.component.scss' ]
})
export class LaterComponent {
    readonly gridData$: Observable<Movie[]>;
    constructor(service: MovieService) {
        this.gridData$ = service.getLaterMovies();
    }
}
