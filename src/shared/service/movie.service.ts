import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Genre } from "../model/genre";
import { MovieDTO } from "../model/movie.dto";

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(private httpClient: HttpClient) {}

    getAllMovies(): Observable<{
        genres: Genre[],
        movies: MovieDTO[]
    }> {
        return this.httpClient.get<{
            genres: Genre[],
            movies: MovieDTO[]
        }>('/assets/data.json');
    }
}