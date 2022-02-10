import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IInfiniteScrollEvent } from "ngx-infinite-scroll";
import { Observable } from "rxjs";
import { Genre } from "src/shared/model/genre";
import { MovieService } from "src/shared/service/movie.service";
import { Movie } from "../../../model/movie";

@Component({
    selector: 'bit-grid',
    templateUrl: './grid.component.html',
    styleUrls: [ './grid.component.scss' ]
})
export class GridComponent {
    
    // @Input() keyword!: Observable<string>;
    @Input() movieList!: Movie[] | null;
    @Output() scroll = new EventEmitter<void>();
    @Output() genre = new EventEmitter<Genre>();
    genreText?: Genre;
    genreList$: Observable<Genre[]>;

    constructor(movieService: MovieService) {
        this.genreList$ = movieService.getGenreList();
    }

    onScroll(e: IInfiniteScrollEvent): void {
        this.scroll.emit();
    }

    onGenreChange(gen?: Genre): void {
        this.genre.emit(gen);
        this.genreText = gen;
    }

    trackByFn(index: number, item: Movie): any {
        return item.id;
    }
}