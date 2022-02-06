import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IInfiniteScrollEvent } from "ngx-infinite-scroll";
import { Observable } from "rxjs/internal/Observable";
import { Grid } from "../../../model/grid";
import { GridService } from "../grid.service";

@Component({
    selector: 'bit-grid',
    templateUrl: './grid.component.html',
    styleUrls: [ './grid.component.scss' ],
    providers: [ GridService ]
})
export class GridComponent implements OnDestroy, OnInit {
    
    public gridData!: Grid;
    @Input() keyword!: Observable<string>;

    constructor(private service: GridService) {}

    ngOnInit(): void {
        this.gridData = new Grid(this.service.getMoviesPagable(), this.keyword);
    }

    ngOnDestroy(): void {
        this.gridData.destroy();
    }

    onScroll(e: IInfiniteScrollEvent): void {
        this.gridData.scroll();
    }
}