import { Component, OnDestroy } from "@angular/core";
import { IInfiniteScrollEvent } from "ngx-infinite-scroll";
import { Grid } from "../grid";
import { GridService } from "../grid.service";
import { Movie } from "../movie";

@Component({
    selector: 'bit-grid',
    templateUrl: './grid.component.html',
    styleUrls: [ './grid.component.scss' ],
    providers: [ GridService ]
})
export class GridComponent implements OnDestroy {
    
    public gridData = new Grid(this.service.getMoviesPagable.bind(this.service))

    constructor(private service: GridService) {}

    ngOnDestroy(): void {
        this.gridData.destroy();
    }

    onScroll(e: IInfiniteScrollEvent): void {
        this.gridData.scroll();
    }

    imageNotFound(movie: Movie): void {
        movie.posterUrl = '/assets/broken_image_black_24dp.svg';
    }
}