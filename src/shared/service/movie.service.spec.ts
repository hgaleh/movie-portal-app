import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { map, mergeMap, Observable, of, take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Genre } from '../model/genre';
import { Movie } from '../model/movie';
import { MovieService } from './movie.service';

describe('movie service test', () => {
    let mockData: {
        genres: Genre[],
        movies: Movie[]
    };

    const mockHttpClient = {
        get() {
            return of(mockData)
        }
    }
    
    let service: MovieService;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        mockData = getMockData();
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: mockHttpClient },
                MovieService
            ]
        });
        service = TestBed.inject(MovieService);
        testScheduler = new TestScheduler((act, exp) => {
            expect(act).toEqual(exp);
        });
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getDecadeList returns true decades', () => {
        testScheduler.run(helpers => {
            const { expectObservable } = helpers;
            expectObservable(service.getDecadeList()).toBe('a', {a: [2000, 2010, 2020]})
        });
    });

    it('getGenreList works', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            let res: Observable<Genre[]>;

            res = cold('-a').pipe(mergeMap(() => {
                return service.getGenreList();
            }));

            expectObservable(res).toBe('-a', {a: [
                'Comedy',
                'Fantasy'
            ]})
        });
    });

    it('getMovies works', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            let res = service.getMovies();
            expectObservable(res).toBe('a', {
                a: mockData.movies
            })
        });
    });

    it('updateMovie updates the movie', () => {
        testScheduler.run(helpers => {
            const { expectObservable, cold } = helpers;
            const firstMovieTitle$ = service.getMovies().pipe(map(movies => movies[1].title));

            cold('-a').subscribe(() => {
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

            expectObservable(firstMovieTitle$).toBe('ab', {
                a: 'TITLE',
                b: 'UpdatedTitle'
            })    
        });
    });

    it('update should make a new instance of the input object', () => {

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

        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const movies$ = service.getMovies().pipe(map(movies => movies[1]), take(2));
            cold('-a').subscribe(() => {
                service.updateMovie(
                    newObject
                )
            })
            expectObservable(movies$).toBe('a(b|)', {
                a: mockData.movies[1],
                b: newObject
            })
        });
    });

    it('getFavoriteMovies returns correct movies', () => {
        testScheduler.run(helpers => {
            const { expectObservable } = helpers;
            const fav$ = service.getFavoriteMovies().pipe(map(x => x.map(m => m.id)));
            expectObservable(fav$).toBe('a', {
                a: [
                    10, 30
                ]
            });
        });
    });

    it('getLaterMovies returns correct movies', () => {
        testScheduler.run(helpers => {
            const { expectObservable } = helpers;
            const fav$ = service.getLaterMovies().pipe(map(x => x.map(m => m.id)));
            expectObservable(fav$).toBe('a', {
                a: [
                    20, 10
                ]
            });
        });
    });
});

function getMockData(): {
    genres: Genre[],
    movies: Movie[]
} {
    return {
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
    };
}