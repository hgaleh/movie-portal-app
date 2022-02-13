import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { Movie } from "../model/movie";
import { pagableShared } from "./pagable-shared";

describe('PagableShared test', () => {

    let testScheduler: TestScheduler;

    beforeEach(() => {

        testScheduler = new TestScheduler((ac, ex) => {
            expect(ac).toEqual(ex);
        });

    });

    it('first view of page should show first 20 movies', () => {
        testScheduler.run(helpers => {
            const movieList$ = of(getAllMovies());
            const { cold, expectObservable } = helpers;
            const scroll$ = cold('(-|)');
            const genre$ = cold('(-|)');
            const decade$ = cold('-|');
            const res = pagableShared(scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>, movieList$, () => true);
            expectObservable(res).toBe('a', {
                a: getAllMovies()
            });
        })
    });

    it('after viewing the first page, scroll will bring the 40 movies', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const movieList$ = of(getAllMovies().concat(getAllMovies(), getAllMovies())); // 60 movies
            const scroll$ = cold('-a|');
            const genre$ = cold('-|');
            const decade$ = cold('-|');
            const res = pagableShared(scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>, movieList$, () => true);
            expectObservable(res).toBe('ab', {
                a: getAllMovies(),
                b: getAllMovies().concat(getAllMovies())
            });
        });
    })

    it('should return one movies genre: Action', () => {
        const actionMovies = [
            {
                id: 100,
                title: 'TITLE01',
                genres: ['Action'],
                year: '10'
            },
            {
                id: 101,
                title: 'TITLE02',
                genres: ['Action'],
                year: '15'
            },
            {
                id: 102,
                title: 'TITLE03',
                genres: ['Action'],
                year: '10'
            },
            {
                id: 103,
                title: 'TITLE04',
                genres: ['Action'],
                year: '15'
            }
        ]
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const movieList$ = of(getAllMovies());
            const scroll$ = cold('-|');
            const genre$ = cold('-a|', { a: 'Action' });
            const decade$ = cold('-|');
            const res = pagableShared(scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>, movieList$, () => true);
            expectObservable(res).toBe('ab', {
                a: getAllMovies(),
                b: actionMovies
            });
        });
    })

    it('return all movies from 40-50', () => {
        const movies4050 = [
            {
                id: 104,
                title: 'TITLE05',
                genres: ['Adventure'],
                year: '41'
            },
            {
                id: 109,
                title: 'TITLE10',
                genres: ['Animation'],
                year: '48'
            },
            {
                id: 117,
                title: 'TITLE18',
                genres: ['Drama'],
                year: '47'
            }
        ]
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const movieList$ = of(getAllMovies());
            const scroll$ = cold('-|');
            const genre$ = cold('-|');
            const decade$ = cold('-a|', { a: 40 });
            const res = pagableShared(scroll$ as Observable<any>, genre$ as Observable<any>,
                decade$ as Observable<any>, movieList$, () => true);
            expectObservable(res).toBe('ab', {
                a: getAllMovies(),
                b: movies4050
            });
        })
    })
});

function getAllMovies(): Movie[] {
    return [
        {
            id: 100,
            title: 'TITLE01',
            genres: ['Action'],
            year: '10'
        },
        {
            id: 101,
            title: 'TITLE02',
            genres: ['Action'],
            year: '15'
        },
        {
            id: 102,
            title: 'TITLE03',
            genres: ['Action'],
            year: '10'
        },
        {
            id: 103,
            title: 'TITLE04',
            genres: ['Action'],
            year: '15'
        },
        {
            id: 104,
            title: 'TITLE05',
            genres: ['Adventure'],
            year: '41'
        },
        {
            id: 105,
            title: 'TITLE06',
            genres: ['Adventure'],
            year: '21'
        },
        {
            id: 106,
            title: 'TITLE07',
            genres: ['Adventure'],
            year: '24'
        },
        {
            id: 107,
            title: 'TITLE08',
            genres: ['Animation'],
            year: '27'
        },
        {
            id: 108,
            title: 'TITLE09',
            genres: ['Animation'],
            year: '34'
        },
        {
            id: 109,
            title: 'TITLE10',
            genres: ['Animation'],
            year: '48'
        },
        {
            id: 110,
            title: 'TITLE11',
            genres: ['Biography'],
            year: '51'
        },
        {
            id: 111,
            title: 'TITLE12',
            genres: ['Biography'],
            year: '92'
        },
        {
            id: 112,
            title: 'TITLE13',
            genres: ['Biography'],
            year: '29'
        },
        {
            id: 113,
            title: 'TITLE14',
            genres: ['Comedy'],
            year: '32'
        },
        {
            id: 114,
            title: 'TITLE15',
            genres: ['Comedy'],
            year: '14'
        },
        {
            id: 115,
            title: 'TITLE16',
            genres: ['Drama'],
            year: '4'
        },
        {
            id: 116,
            title: 'TITLE17',
            genres: ['Drama'],
            year: '74'
        },
        {
            id: 117,
            title: 'TITLE18',
            genres: ['Drama'],
            year: '47'
        },
        {
            id: 118,
            title: 'TITLE19',
            genres: ['Drama'],
            year: '69'
        },
        {
            id: 119,
            title: 'TITLE20',
            genres: ['Fantasy'],
            year: '91'
        }
    ] as Movie[]
}