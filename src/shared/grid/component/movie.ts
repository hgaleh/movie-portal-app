import { Genre } from "../../model/genre";
import { MovieDTO } from "../../model/movie.dto";

export class Movie implements MovieDTO {
    id!: number;
    title!: string;
    year!: string;
    runtime!: string;
    genres!: Genre[];
    director!: string;
    actors!: string;
    plot!: string;
    posterUrl!: string;

    constructor(dto: MovieDTO) {
        Object.assign(this, dto);
    }
}