import { Movie } from "../model/movie";
import { genreMatch } from "./genre-match";

describe('GenreMatch test', () => {

    it('genre empty always match', () => {
        const movie = {
            genres: [
                "Action",
                "Adventure"
            ]
        } as Movie;
        expect(genreMatch(movie)).toBeTrue();
    });

    it('movie does not have the genre in list', () => {
        const movie = {
            genres: [
                "Action",
                "Adventure"
            ]
        } as Movie;
        expect(genreMatch(movie, 'Biography')).toBeFalse();
    });

    it('movie has the genre in list', () => {
        const movie = {
            genres: [
                "Action",
                "Adventure"
            ]
        } as Movie;
        expect(genreMatch(movie, 'Action')).toBeTrue();
    });

});
