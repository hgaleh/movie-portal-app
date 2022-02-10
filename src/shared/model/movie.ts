import { Genre } from "./genre";

export interface Movie {
    id: number;
    title: string;
    year: string;
    runtime: string;
    genres: Genre[];
    director: string;
    actors: string;
    plot: string;
    posterUrl: string;
    isFavorite: boolean;
    isLater: boolean;
}