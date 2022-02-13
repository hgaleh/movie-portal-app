import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { Movie } from "src/shared/model/movie";
import { MovieService } from '../../../shared/service/movie.service';
import { DashboardService } from "./dashboard.service";

describe('Dashboard service test', () => {

    let testScheduler: TestScheduler;
    let movieServiceMock: jasmine.SpyObj<MovieService>;
    let service: DashboardService;

    beforeEach(() => {
        testScheduler = new TestScheduler((ac, ex) => {
            expect(ac).toEqual(ex);
        });
        movieServiceMock = jasmine.createSpyObj('MovieService', [ 'getMovies' ]);
        movieServiceMock.getMovies = jasmine.createSpy('getMovies').and.returnValue(of(getAllMovies()));
        TestBed.configureTestingModule({
            providers: [
                DashboardService,
                {
                    provide: MovieService,
                    useValue: movieServiceMock
                }
            ]
        });
        service = TestBed.inject(DashboardService);
    });

    it('first view of page should show first 20 movies', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            movieServiceMock.getMovies.and.returnValue(of(getAllMovies()))
            const keyword$ = cold('-(a|)', { a : '' });
            const scroll$ = cold('(-|)');
            const genre$ = cold('(-|)');
            const decade$ = cold('(-|)');
            const res = service.getMoviesPagable(keyword$, scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>);
            expectObservable(res).toBe('-a', {
                a: getAllMovies()
            });
        });
    });

    it('after viewing the first page, scroll will bring the 40 movies', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const movies20 = getAllMovies();
            const movies40 = movies20.concat(movies20);
            movieServiceMock.getMovies.and.returnValue(of(movies40));
            const keyword$ = cold('-(a|)', { a : '' });
            const scroll$ = cold('-(a|)', { a: undefined });
            const genre$ = cold('(-|)');
            const decade$ = cold('(-|)');
            const res = service.getMoviesPagable(keyword$, scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>);
            expectObservable(res).toBe('-ab', {
                a: movies20,
                b: movies40
            });
        });
    })

    it('when all rows received additional scrolls return same result', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const movies20 = getAllMovies();
            const movies40 = movies20.concat(movies20);
            movieServiceMock.getMovies.and.returnValue(of(movies40));
            const keyword$ = cold('-(a|)', { a : '' });
            const scroll$ = cold('-aa(a|)', { a: undefined });
            const genre$ = cold('(-|)');
            const decade$ = cold('(-|)');
            const res = service.getMoviesPagable(keyword$, scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>);
            expectObservable(res).toBe('-abbb', {
                a: movies20,
                b: movies40
            });
        });
    });

    it('find movies title: TITLE01', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const movies20 = getAllMovies();
            const keyword$ = cold('-a(b|)', { a : '', b: 'TITLE01' });
            const scroll$ = cold('-|', { a: undefined });
            const genre$ = cold('-|');
            const decade$ = cold('-|');
            const res = service.getMoviesPagable(keyword$, scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>);
            expectObservable(res).toBe('-ab', {
                a: movies20,
                b: [{
                    id: 100,
                    title: 'TITLE01',
                    genres: ['Action'],
                    year: '10',
                    runtime: '1'
                }]
            });
        });
    });

    it('find movies genre: Fantasy', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const movies20 = getAllMovies();
            const keyword$ = cold('a|', { a : ''});
            const scroll$ = cold('-|');
            const genre$ = cold('-a|', { a: 'Fantasy'});
            const decade$ = cold('-|');
            const res = service.getMoviesPagable(keyword$, scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>);
            expectObservable(res).toBe('ab', {
                a: movies20,
                b: [{
                    id: 119,
                    title: 'TITLE20',
                    genres: ['Fantasy'],
                    year: '91',
                    runtime: '20'
                }]
            });
        });
    });

    it('find movies decade: 50-60', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const movies20 = getAllMovies();
            const keyword$ = cold('a|', { a : ''});
            const scroll$ = cold('-|');
            const genre$ = cold('-|');
            const decade$ = cold('-a|', { a: 50 });
            const res = service.getMoviesPagable(keyword$, scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>);
            expectObservable(res).toBe('ab', {
                a: movies20,
                b: [{
                    id: 110,
                    title: 'TITLE11',
                    genres: ['Biography'],
                    year: '51',
                    runtime: '11'
                }]
            });
        });
    });

    it('best movies return the logest movies', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const best$ = service.getBestMovies();
            const bestExp = getAllMovies().slice(10, 20).reverse();
            expectObservable(best$).toBe('(a|)', {
                a: bestExp
            })
        });
    });
});

function getAllMovies(): Movie[] {
    return [
        {
            id: 100,
            title: 'TITLE01',
            genres: ['Action'],
            year: '10',
            runtime: '1'
        },
        {
            id: 101,
            title: 'TITLE02',
            genres: ['Action'],
            year: '15',
            runtime: '2'
        },
        {
            id: 102,
            title: 'TITLE03',
            genres: ['Action'],
            year: '10',
            runtime: '3'
        },
        {
            id: 103,
            title: 'TITLE04',
            genres: ['Action'],
            year: '15',
            runtime: '4'
        },
        {
            id: 104,
            title: 'TITLE05',
            genres: ['Adventure'],
            year: '41',
            runtime: '5'
        },
        {
            id: 105,
            title: 'TITLE06',
            genres: ['Adventure'],
            year: '21',
            runtime: '6'
        },
        {
            id: 106,
            title: 'TITLE07',
            genres: ['Adventure'],
            year: '24',
            runtime: '7'
        },
        {
            id: 107,
            title: 'TITLE08',
            genres: ['Animation'],
            year: '27',
            runtime: '8'
        },
        {
            id: 108,
            title: 'TITLE09',
            genres: ['Animation'],
            year: '34',
            runtime: '9'
        },
        {
            id: 109,
            title: 'TITLE10',
            genres: ['Animation'],
            year: '48',
            runtime: '10'
        },
        {
            id: 110,
            title: 'TITLE11',
            genres: ['Biography'],
            year: '51',
            runtime: '11'
        },
        {
            id: 111,
            title: 'TITLE12',
            genres: ['Biography'],
            year: '92',
            runtime: '12'
        },
        {
            id: 112,
            title: 'TITLE13',
            genres: ['Biography'],
            year: '29',
            runtime: '13'
        },
        {
            id: 113,
            title: 'TITLE14',
            genres: ['Comedy'],
            year: '32',
            runtime: '14'
        },
        {
            id: 114,
            title: 'TITLE15',
            genres: ['Comedy'],
            year: '14',
            runtime: '15'
        },
        {
            id: 115,
            title: 'TITLE16',
            genres: ['Drama'],
            year: '4',
            runtime: '16'
        },
        {
            id: 116,
            title: 'TITLE17',
            genres: ['Drama'],
            year: '74',
            runtime: '17'
        },
        {
            id: 117,
            title: 'TITLE18',
            genres: ['Drama'],
            year: '47',
            runtime: '18'
        },
        {
            id: 118,
            title: 'TITLE19',
            genres: ['Drama'],
            year: '69',
            runtime: '19'
        },
        {
            id: 119,
            title: 'TITLE20',
            genres: ['Fantasy'],
            year: '91',
            runtime: '20'
        }
    ] as Movie[]
}