import { Injectable } from "@angular/core";
import { Movie } from "../model/movie";
import { InfinitScroll } from "./infinit-scroll";

@Injectable()
export class InfiniteScrollService {
    getNewInfiniteScroll(): InfinitScroll<Movie> {
        return new InfinitScroll(
            <Movie[]>[], 172, 0
        );
    }
}