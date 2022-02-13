import { CommonModule } from "@angular/common";
import { Component, Input, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatMenuModule } from "@angular/material/menu";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { Movie } from "src/shared/model/movie";
import { MovieService } from "src/shared/service/movie.service";
import { GridComponent } from "./grid.component";

@Pipe({
    name: 'decade'
})
class MockDecadePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return value;
    }
}

@Component({
    selector: 'bit-thumbnail',
    template: `
        {{movie.id}}
    `
})
class MockThumbnail {
    @Input() movie!: Movie;
}

describe('GridComponent test', () => {
    let fixture: ComponentFixture<GridComponent>;
    let component: GridComponent;
    let mockService;

    beforeEach(() => {
        mockService = createMockService();
        fixture = TestBed.configureTestingModule({
            declarations: [
                GridComponent,
                MockDecadePipe,
                MockThumbnail
            ],
            imports: [
                CommonModule,
                MatMenuModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: MovieService, useValue: mockService }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).createComponent(GridComponent);
        component = fixture.componentInstance;
        component.movieList = createMovieList();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('has a button for genre', () => {
        const btnGenre = fixture.debugElement.query(By.css('button:first-of-type'));
        expect(btnGenre.nativeElement).toBeTruthy();
    });

    it('has a button for decade', () => {
        const btnDecade = fixture.debugElement.query(By.css('button:nth-of-type(2)'));
        expect(btnDecade.nativeElement).toBeTruthy();
    });

    it('has a place for showing movies', () => {
        const container = fixture.debugElement.query(By.css('#thumbnail-list')).nativeElement;
        expect(container).toBeTruthy();
    });

    it('title for genre is received from component', () => {
        const btnGenre = fixture.debugElement.query(By.css('button:first-of-type'));
        component.genreText = 'Action';
        fixture.detectChanges();
        btnGenre.nativeElement.textContent = 'Action';
    });

    it('title for decade is received from component', () => {
        const btnGenre = fixture.debugElement.query(By.css('button:nth-of-type(2)'));
        component.selectedDecade = 100;
        fixture.detectChanges();
        btnGenre.nativeElement.textContent = '100';
    });

    it('clicking genre will open a menu', (done) => {
        const btnGenre = fixture.debugElement.query(By.css('button:first-of-type'));
        btnGenre.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const menu = fixture.nativeElement.parentNode.querySelector('.mat-menu-panel');
            expect(menu).toBeTruthy();
            done();
        });
    });

    it('clicking decade will open a menu', (done) => {
        const btnDecade = fixture.debugElement.query(By.css('button:nth-of-type(2)'));
        btnDecade.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const menu = fixture.nativeElement.parentNode.querySelector('.mat-menu-panel');
            expect(menu).toBeTruthy();
        });
        done();
    });

    it('first element of genre menu is all', (done) => {
        const btnGenre = fixture.debugElement.query(By.css('button:first-of-type'));
        btnGenre.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const all = fixture.nativeElement.parentNode.querySelector('.mat-menu-panel button:first-of-type');
            expect(all.textContent.trim()).toBe('All');
            done();
        });
    });

    it('first element of decade menu is all', (done) => {
        const btnDecade = fixture.debugElement.query(By.css('button:nth-of-type(2)'));
        btnDecade.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const all = fixture.nativeElement.parentNode.querySelector('.mat-menu-panel button:first-of-type');
            expect(all.textContent.trim()).toBe('All');
            done();
        });
    });

    it('elements of genre menu are filled with genreList', (done) => {
        const btnGenre = fixture.debugElement.query(By.css('button:first-of-type'));
        btnGenre.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const secondChild = fixture.nativeElement.parentNode.querySelector('.mat-menu-panel button:nth-of-type(2)');
            expect(secondChild.textContent.trim()).toBe('Fantasy');
            done();
        });
    });

    it('elements of decade menu are filled with decadeList', (done) => {
        const btnDecade = fixture.debugElement.query(By.css('button:nth-of-type(2)'));
        btnDecade.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const secondChild = fixture.nativeElement.parentNode.querySelector('.mat-menu-panel button:nth-of-type(2)');
            expect(secondChild.textContent.trim()).toBe('10');
            done();
        });
    });

    it('two movies are shown in grid', () => {
        const thumbnailList = fixture.debugElement.queryAll(By.css('#thumbnail-list > bit-thumbnail'));
        expect(thumbnailList.length).toBe(2);
    });

    it('movie titles are received from model', () => {
        const thumbnailList = fixture.debugElement.queryAll(By.css('#thumbnail-list > bit-thumbnail'));
        const ids = ['141', '142'];
        thumbnailList.forEach(thumbnail => {
            expect(thumbnail.nativeElement.textContent.trim()).toBe(ids.shift());
        })
    });
});

function createMockService() {
    const mock = jasmine.createSpyObj('MovieService', ['getGenreList', 'getDecadeList']);
    mock.getGenreList = jasmine.createSpy('getGenreList').and.returnValue(of([
        'Fantasy',
        'Crime'
    ]));

    mock.getDecadeList = jasmine.createSpy('getGenreList').and.returnValue(of([
        10,
        20
    ]));
    return mock;
}

function createMovieList(): Movie[] {
    return <Movie[]>[
        {
            id: 141,
            title: "Hotel Rwanda",
            year: "2004",
            runtime: "121",
            genres: [
                "Drama",
                "History",
                "War"
            ],
            director: "Terry George",
            actors: "Xolani Mali, Don Cheadle, Desmond Dube, Hakeem Kae-Kazim",
            plot: "Paul Rusesabagina was a hotel manager who housed over a thousand Tutsi refugees during their struggle against the Hutu militia in Rwanda.",
            posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2MzQyNTc1M15BMl5BanBnXkFtZTYwMjExNjc3._V1_SX300.jpg"
        },
        {
            id: 142,
            title: "The Martian",
            year: "2015",
            runtime: "144",
            genres: [
                "Adventure",
                "Drama",
                "Sci-Fi"
            ],
            director: "Ridley Scott",
            actors: "Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels",
            plot: "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",
            posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg"
        }
    ]
}