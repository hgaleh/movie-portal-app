import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
    })

});
