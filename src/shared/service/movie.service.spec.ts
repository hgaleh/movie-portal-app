import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Genre } from '../model/genre';
import { Movie } from '../model/movie';
import { MovieService } from './movie.service';

const mockHttpClient = {
    get() {
        return of(mockData)
    }
}

const mockData: {
    genres: Genre[],
    movies: Movie[]
} = {
    genres: [
        'Comedy',
        'Fantasy'
    ],
    movies: [
        {
            id: 20,
            title: 'TITLE2',
            year: '2012',
            runtime: '110',
            genres: [ 'Fantasy' ],
            director: 'DIRECTOR2',
            actors: 'ACTORS2',
            plot: 'PLOT2',
            posterUrl: 'POSTERURL2',
            isFavorite: false,
            isLater: true 
        },
        {
            id: 10,
            title: 'TITLE',
            year: '2002',
            runtime: '100',
            genres: [ 'Comedy' ],
            director: 'DIRECTOR',
            actors: 'ACTORS',
            plot: 'PLOT',
            posterUrl: 'POSTERURL',
            isFavorite: true,
            isLater: true 
        },
        {
            id: 30,
            title: 'TITLE3',
            year: '2022',
            runtime: '90',
            genres: [ 'Comedy' ],
            director: 'DIRECTOR3',
            actors: 'ACTORS3',
            plot: 'PLOT3',
            posterUrl: 'POSTERURL3',
            isFavorite: true,
            isLater: false 
        },
        {
            id: 40,
            title: 'TITLE4',
            year: '2022',
            runtime: '50',
            genres: [ 'Comedy' ],
            director: 'DIRECTOR4',
            actors: 'ACTORS4',
            plot: 'PLOT4',
            posterUrl: 'POSTERURL4',
            isFavorite: false,
            isLater: false 
        }
    ]
}

describe('movie service test', () => {

    let service: MovieService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: mockHttpClient },
                MovieService
            ]
        });
        service = TestBed.inject(MovieService);     
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getDecadeList returns true decades', (done) => {
        service.getDecadeList().subscribe(decades => {
            expect(decades.length).toBe(3);
            expect(decades).toEqual([
                2000, 2010, 2020
            ])
            done();
        })
    });

    it('getGenreList works', (done) => {
        service.getGenreList().subscribe(genres => {
            expect(genres).toEqual([
                'Comedy',
                'Fantasy'
            ]);
            done();
        })
    });

    it('getMovies works', (done) => {
        service.getMovies().subscribe(movies => {
            expect(movies).toEqual(mockData.movies)
            done();
        });
    });

    it('updateMovie updates the movie', (done) => {
        let count = 0;
        service.getMovies().subscribe(movies => {
            count++;
            if (count === 1) {
                expect(movies[1].title).toBe('TITLE');
            } else {
                expect(movies[1].title).toBe('UpdatedTitle');
                done();
            }
        })
        service.updateMovie(
            {
                id: 10,
                title: 'UpdatedTitle',
                year: '2002',
                runtime: '100',
                genres: [ 'Comedy' ],
                director: 'DIRECTOR',
                actors: 'ACTORS',
                plot: 'PLOT',
                posterUrl: 'POSTERURL',
                isFavorite: true,
                isLater: true 
            }
        )
    });

    it('update should make a new instance of the input object', (done) => {
        let count = 0;
        const newObject = <Movie>{
            id: 10,
            title: 'UpdatedTitle',
            year: '2002',
            runtime: '100',
            genres: [ 'Comedy' ],
            director: 'DIRECTOR',
            actors: 'ACTORS',
            plot: 'PLOT',
            posterUrl: 'POSTERURL',
            isFavorite: true,
            isLater: true 
        }
        service.getMovies().subscribe(movies => {
            count++;
            if (count === 2) {
                expect(movies[1]).not.toBe(newObject);
                done();
            }
        })
        service.updateMovie(
            newObject
        )
    });

    it('getFavoriteMovies returns correct movies', (done) => {
        service.getFavoriteMovies().subscribe(favs => {
            const favIds = favs.map(fav => fav.id);
            expect(favIds).toEqual([
                10, 30
            ]);
            done();
        })
    });

    it('getLaterMovies returns correct movies', (done) => {
        service.getLaterMovies().subscribe(laters => {
            const laterIds = laters.map(later => later.id);
            expect(laterIds).toEqual([
                20, 10
            ]);
            done();
        })
    });
});
