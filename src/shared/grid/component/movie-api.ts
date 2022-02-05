import { Observable } from "rxjs";
import { Movie } from "./movie";

export interface MovieApi {
    (pageIndex: number, pageSize: number): Observable<Movie[]>;
}