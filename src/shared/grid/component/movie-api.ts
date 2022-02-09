import { Observable } from "rxjs";
import { MovieDTO } from "../../model/movie.dto";

export interface MovieApi {
    (keyword: string): Observable<MovieDTO[]>;
}