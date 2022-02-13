import { Injectable } from "@angular/core";
import { combineLatest, map, mergeMap, startWith, Subscription, take, zip } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "src/shared/model/movie";
import { Genre } from "src/shared/model/genre";
import { MovieService } from "src/shared/service/movie.service";
import { genreMatch } from "src/shared/utility/genre-match";
import { decadeMatch } from "src/shared/utility/decade-match";

@Injectable()
export class DashboardService {
    private readonly pageSize = 20;
    constructor(private movieService: MovieService) { }

    getBestMovies(): Observable<Movie[]> {
        return this.movieService.getMovies().pipe(map(movies => {
            return this.selectBestMovies(movies);
        }))
    }

    private selectBestMovies(movie: Movie[]): Movie[] {
        return movie.sort((a, b) => {
            return Number(b.runtime) - Number(a.runtime)
        }).slice(0, 10);
    }

    getMoviesPagable(
        keyword$: Observable<string>,
        scroll$: Observable<void>,
        genre$: Observable<Genre>,
        decade$: Observable<number>
    ): Observable<Movie[]> {
        return new Observable(observer => {
            const subscription = new Subscription();
            let innerSubscription = new Subscription();
            let scrollCounter: number;
            subscription.add(combineLatest([keyword$, genre$.pipe(startWith('')), decade$.pipe(startWith(undefined))]).
                subscribe(([key, genre, decade]) => {
                    scrollCounter = 0;
                    innerSubscription.unsubscribe();
                    innerSubscription = scroll$.pipe(startWith(undefined)).subscribe(() => {
                        scrollCounter++;
                        observer.next({
                            scroll: scrollCounter,
                            keyword: key,
                            genre,
                            decade
                        })
                    });
                    subscription.add(innerSubscription);
                }
            ))
            return subscription;
        }).pipe(
            mergeMap((res: any) => {
                return this.movieService.getMovies().pipe(map(all => {
                    const start = res.scroll * this.pageSize;
                    return all.filter(movie => this.matchCondition(movie, res.keyword, res.genre, res.decade)).slice(0, start + this.pageSize - 1);
                }))    
            })    
        );
    }

    matchCondition(movie: Movie, keyword: string, genre: Genre, decade: number): boolean {
        return movie.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) &&
                genreMatch(movie, genre) &&
                decadeMatch(movie, decade)
    }
}