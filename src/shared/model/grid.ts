import { BehaviorSubject, combineLatest, Observable, Subscription } from "rxjs";
import { MovieDTO as Movie } from "./movie.dto";
import { MovieApi } from "../grid/component/movie-api";

export class Grid {
    private readonly pageSize = 20;
    private pageIndex = 0;
    private readonly movieList = new BehaviorSubject<Movie[]>([]);
    private subscription = new Subscription();
    private previousKeyword = '';

    constructor(private api: MovieApi, private keyword$: Observable<string>) {
        this.scroll();
        this.keyword$.subscribe(key => {
            this.previousKeyword = key;
            this.pageIndex = 0;
            this.movieList.next([]);
            this.scroll();
        });
    }

    scroll(): void {
        this.subscription.add(this.api(this.pageIndex,  this.pageSize, this.previousKeyword).subscribe(movies => {
            this.movieList.next(this.movieList.value.concat(movies));
            this.pageIndex += 1;
        }))
    }

    list(): Observable<Movie[]> {
        return this.movieList.asObservable();
    }

    destroy(): void {
        this.subscription.unsubscribe();
    }
}