import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { GridComponent } from "src/shared/grid/component/grid/grid.component";
import { Movie } from "src/shared/model/movie";
import { FavoriteService } from "../../favorite.service";

@Component({
    templateUrl: './favorite.component.html',
    styleUrls: [ './favorite.component.scss' ],
    providers: [
        FavoriteService
    ]
})
export class FavoriteComponent implements OnInit {
    gridData$!: Observable<Movie[]>;
    @ViewChild('grid', { static: true }) grid!: GridComponent;

    constructor(private service: FavoriteService) {
    }

    ngOnInit(): void {
        this.gridData$ = this.service.getFavoritesPagable(this.grid.scroll, this.grid.genre);
    }
}
