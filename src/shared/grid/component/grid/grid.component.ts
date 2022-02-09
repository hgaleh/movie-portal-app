import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { IInfiniteScrollEvent } from "ngx-infinite-scroll";
import { Observable } from "rxjs";
import { Movie } from "../movie";

@Component({
    selector: 'bit-grid',
    templateUrl: './grid.component.html',
    styleUrls: [ './grid.component.scss' ]
})
export class GridComponent {
    
    // @Input() keyword!: Observable<string>;
    @Input() movieList!: Movie[] | null;
    @Output() scroll = new EventEmitter<void>();

    constructor() {}

    onScroll(e: IInfiniteScrollEvent): void {
        this.scroll.emit();
    }
}