import { map, mergeMap, startWith } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "../model/movie";
import { Genre } from "../model/genre";
import { genreMatch } from "./genre-match";

const pageSize = 20;

export function pagableShared(
    scroll$: Observable<void>,
    genre$: Observable<Genre>,
    movies$: Observable<Movie[]>,
    additionalCriteria: (movie: Movie) => boolean
): Observable<Movie[]> {
    const obs = new Observable(observer => {
        let scrollCounter: number;
        genre$.pipe(startWith(undefined)).subscribe((genre) => {
            scrollCounter = 0;
            scroll$.pipe(startWith(undefined)).subscribe(() => {
                scrollCounter++;
                observer.next({
                    scroll: scrollCounter,
                    genre
                })
            })
        })
    }).pipe(
        mergeMap((res: any) => {
            return movies$.pipe(map(all => {
                const start = res.scroll * pageSize;
                return all.filter(movie => genreMatch(movie, res.genre) && additionalCriteria(movie)).slice(0, start + pageSize - 1);
            }))    
        })    
    );
    return obs;
}