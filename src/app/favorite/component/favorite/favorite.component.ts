import { Component, ViewChild } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { GridComponent } from "src/shared/grid/component/grid/grid.component";
import { Movie } from "src/shared/grid/component/movie";
import { FavoriteService } from "../../favorite.service";

@Component({
    templateUrl: './favorite.component.html',
    styleUrls: [ './favorite.component.scss' ],
    providers: [
        FavoriteService
    ]
})
export class FavoriteComponent {
    readonly gridData$: Observable<Movie[]>;
    @ViewChild('grid', { static: true }) grid!: GridComponent;

    constructor(service: FavoriteService) {
        this.gridData$ = service.getFavoritesPagable(this.grid.scroll, this.grid.genre);
    }
}
