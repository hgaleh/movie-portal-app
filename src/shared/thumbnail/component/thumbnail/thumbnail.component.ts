import { Component, Input } from "@angular/core";
import { Movie } from "src/shared/grid/component/movie";

@Component({
    selector: 'bit-thumbnail',
    templateUrl: './thumbnail.component.html',
    styleUrls: [ './thumbnail.component.scss' ]
})
export class ThumbnailComponent {
    @Input() movie!: Movie;

    imageNotFound(movie: Movie): void {
        movie.posterUrl = '/assets/broken_image_black_24dp.svg';
    }
}