import { Movie } from "../model/movie";

export function decadeMatch(movie: Movie, decade?: number): boolean {
    const movieYear = +movie.year;
    return !decade || (movieYear >= decade && movieYear < decade + 10)
}