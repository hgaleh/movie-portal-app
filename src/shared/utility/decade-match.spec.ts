import { Movie } from "../model/movie";
import { decadeMatch } from "./decade-match";

describe('decadeMatch test', () => {

    it('movie year bigger than decade range', () => {
        const movie = {
            year: 20
        } as any as Movie;

        const real = decadeMatch(movie, 10);
        expect(real).toBeFalse();
    });

    it('movie year lower than decade range', () => {
        const movie = {
            year: 5
        } as any as Movie;

        const real = decadeMatch(movie, 10);
        expect(real).toBeFalse();
    });

    it('movie year in decade range', () => {
        const movie = {
            year: 15
        } as any as Movie;

        const real = decadeMatch(movie, 10);
        expect(real).toBeTrue();
    });

    it('decade undefined, movie always match', () => {
        const movie = {
            year: 5
        } as any as Movie;

        const real = decadeMatch(movie);
        expect(real).toBeTrue();
    })

});
