import { Observable } from "rxjs";
import { MovieDTO } from "../../model/movie.dto";

export interface MovieApi {
    (pageIndex: number, pageSize: number, keyword: string): Observable<MovieDTO[]>;
}