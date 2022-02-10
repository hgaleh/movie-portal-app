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

    @Input() movieList!: Movie[] | null;
    @Output() scroll = new EventEmitter<void>();
    @Output() genre = new EventEmitter<Genre>();
    @Output() decade = new EventEmitter<number>();
    genreText?: Genre;
    selectedDecade?: number;
    genreList$: Observable<Genre[]>;
    decadeList$: Observable<number[]>;

    constructor(movieService: MovieService) {
        this.genreList$ = movieService.getGenreList();
        this.decadeList$ = movieService.getDecadeList();
    }

    onScroll(e: IInfiniteScrollEvent): void {
        this.scroll.emit();
    }

    onGenreChange(gen?: Genre): void {
        this.genre.emit(gen);
        this.genreText = gen;
    }

    onDecadeChange(decade?: number): void {
        this.decade.emit(decade);
        this.selectedDecade = decade;
    }

    trackByFn(index: number, item: Movie): any {
        return item.id;
    }
}