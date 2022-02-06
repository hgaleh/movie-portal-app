import { Component, ViewChild } from "@angular/core";
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from "@ng-bootstrap/ng-bootstrap";
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
    images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
    @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

    movies$: Observable<Movie[]>;

    constructor(service: DashboardService) {
        this.movies$ = service.getBestMovies();
    }
}
