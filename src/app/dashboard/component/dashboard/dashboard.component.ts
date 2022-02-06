import { Component } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "src/shared/grid/component/movie";
import { DashboardService } from "../dashboard.service";

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [
        DashboardService
    ]
})
export class DashboardComponent {
    movieList$: Observable<Movie[]>;

    constructor(service: DashboardService) {
        this.movieList$ = service.getBestMovies();
    }
}
