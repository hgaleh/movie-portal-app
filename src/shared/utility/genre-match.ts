import { Movie } from "../grid/component/movie";
import { Genre } from "../model/genre";

export function genreMatch(movie: Movie, genre?: Genre): boolean {
    return !genre || movie.genres.indexOf(genre) > -1;
}