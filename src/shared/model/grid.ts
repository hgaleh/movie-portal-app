import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { MovieDTO as Movie } from "./movie.dto";
import { MovieApi } from "../grid/component/movie-api";

export class Grid {
    private readonly pageSize = 20;
    private pageIndex = 0;
    private readonly movieList = new BehaviorSubject<Movie[]>([]);
    private subscription = new Subscription();

    constructor(private api: MovieApi) {
        this.scroll();
    }

    scroll(): void {
        this.subscription.add(this.api(this.pageIndex + 1,  this.pageSize).subscribe(movies => {
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