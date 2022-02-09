import { Injectable } from "@angular/core";
import { concatAll, count, interval, map, mergeMap, startWith, takeUntil, tap, withLatestFrom } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "src/shared/grid/component/movie";
import { MovieService } from "src/shared/service/movie.service";

@Injectable()
export class DashboardService {
    private readonly pageSize = 20;

    constructor(private movieService: MovieService) { }

    getBestMovies(): Observable<Movie[]> {
        return this.movieService.getMovies().pipe(map(allMovies => {
            return this.selectBestMovies(allMovies);
        }));
    }

    private selectBestMovies(movie: Movie[]): Movie[] {
        return movie.sort((a, b) => {
            return Number(b.runtime) - Number(a.runtime)
        }).slice(0, 10);
    }

    getMoviesPagable(scroll$: Observable<void>, keyword$: Observable<string>): Observable<Movie[]> {
        const obs = new Observable(observer => {
            let scrollCounter: number;
            keyword$.pipe(startWith('')).subscribe(key => {
                scrollCounter = 0;
                scroll$.pipe(startWith(undefined)).subscribe(() => {
                    scrollCounter++;
                    observer.next({
                        scroll: scrollCounter,
                        keyword: key
                    })
                })
            })
        }).pipe(
            mergeMap((res: any) => {
                return this.movieService.getMovies().pipe(map(all => {
                    const start = res.scroll * this.pageSize;
                    return all.filter(movie => movie.title.toLocaleLowerCase().includes(res.keyword.toLocaleLowerCase())).slice(0, start + this.pageSize - 1);
                }))    
            })    
        );
        return obs;
    }
}