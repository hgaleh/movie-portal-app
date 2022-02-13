import { combineLatest, map, mergeMap, startWith, Subscription } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "../model/movie";
import { Genre } from "../model/genre";
import { genreMatch } from "./genre-match";
import { decadeMatch } from "./decade-match";

const pageSize = 20;

export function pagableShared(
    scroll$: Observable<void>,
    genre$: Observable<Genre>,
    decade$: Observable<number>,
    movies$: Observable<Movie[]>,
    additionalCriteria: (movie: Movie) => boolean
): Observable<Movie[]> {
    return new Observable(observer => {
        let scrollCounter: number;
        let subscription = new Subscription();
        let innerSubscription = new Subscription();
        subscription.add(combineLatest([decade$.pipe(startWith(undefined)), genre$.pipe(startWith(undefined))]).
        subscribe(([decade, genre]) => {
                scrollCounter = 0;
                innerSubscription.unsubscribe();
                innerSubscription = scroll$.pipe(startWith(undefined)).subscribe(() => {
                    scrollCounter++;
                    observer.next({
                        scroll: scrollCounter,
                        genre,
                        decade
                    })
                })
                subscription.add(innerSubscription);
            }
        ))
        return subscription;
    }).pipe(
        mergeMap((res: any) => {
            return movies$.pipe(map(all => {
                const end = res.scroll * pageSize;
                return all.filter(movie => genreMatch(movie, res.genre) && additionalCriteria(movie) && decadeMatch(movie, res.decade)).slice(0, end);
            }))
        })
    );
}