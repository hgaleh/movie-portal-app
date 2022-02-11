import { Component, Input } from "@angular/core";
import { Movie } from "src/shared/model/movie";
import { MovieService } from "src/shared/service/movie.service";

@Component({
    selector: 'bit-thumbnail',
    templateUrl: './thumbnail.component.html',
    styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent {
    @Input() movie!: Movie;

    constructor(
        private movieService: MovieService
    ) { }

    toggleLater(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
        const after = Object.assign({}, this.movie, { isLater: !this.movie.isLater })
        this.movieService.updateMovie(
            after
        )
    }

    toggleFavorite(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
        this.movieService.updateMovie(
            Object.assign({}, this.movie, { isFavorite: !this.movie.isFavorite })
        )
    }
}