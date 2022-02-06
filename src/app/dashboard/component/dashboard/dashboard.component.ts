import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { Movie } from "src/shared/grid/component/movie";
import { Grid } from "src/shared/model/grid";
import { RouterService, ROUTER_SERVICE_PROVIDR } from "src/shared/service/router.service";
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
    keyword$: Observable<string>;
    constructor(
        service: DashboardService,
        private activatedRoute: ActivatedRoute
    ) {
        this.keyword$ = this.activatedRoute.queryParams.pipe(map(par => par['keyword'] || ''));
        this.movieList$ = service.getBestMovies();
    }
}
