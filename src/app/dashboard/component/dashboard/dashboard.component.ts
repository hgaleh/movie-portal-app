import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { GridComponent } from "src/shared/grid/component/grid/grid.component";
import { Movie } from "src/shared/grid/component/movie";
import { DashboardService } from "../dashboard.service";

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [
        DashboardService
    ]
})
export class DashboardComponent implements OnInit {
    movieList$: Observable<Movie[]>;
    allMovieList$!: Observable<Movie[]>;
    @ViewChild('grid', { static: true }) grid!: GridComponent;

    constructor(
        private service: DashboardService,
        private activatedRoute: ActivatedRoute
    ) {
        this.movieList$ = service.getBestMovies();
    }
    
    ngOnInit(): void {
        const keyword$ = this.activatedRoute.queryParams.pipe(map(par => par['keyword'] || ''));
        this.allMovieList$ = this.service.getMoviesPagable(this.grid.scroll, keyword$, this.grid.genre);
    }
}
