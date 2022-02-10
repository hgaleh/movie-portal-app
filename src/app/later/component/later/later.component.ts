import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { GridComponent } from "src/shared/grid/component/grid/grid.component";
import { Movie } from "src/shared/model/movie";
import { LaterService } from "../../later.service";

@Component({
    templateUrl: './later.component.html',
    styleUrls: [ './later.component.scss' ],
    providers: [ LaterService ]
})
export class LaterComponent implements OnInit {
    gridData$!: Observable<Movie[]>;
    @ViewChild('grid', { static: true }) grid!: GridComponent;

    constructor(private service: LaterService) {
    }

    ngOnInit(): void {
        this.gridData$ = this.service.getLaterPagable(this.grid.scroll, this.grid.genre);
    }
}
