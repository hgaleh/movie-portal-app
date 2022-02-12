import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatMenuModule } from "@angular/material/menu";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Movie } from "src/shared/model/movie";
import { MovieService } from "src/shared/service/movie.service";
import { ThumbnailComponent } from "./thumbnail.component";

describe('Thumbnail test', () => {
    let mockService = jasmine.createSpyObj('MovieService', [ 'updateMovie' ]);
    let fixture: ComponentFixture<ThumbnailComponent>;
    let component: ThumbnailComponent;
    let image: DebugElement;
    const query = (query: string) => fixture.debugElement.query(By.css(query));
    const movie = {
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
    } as Movie;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                ThumbnailComponent
            ],
            providers: [ {
                provide: MovieService,
                useValue: mockService
            }],
            imports: [
                MatMenuModule,
                BrowserAnimationsModule
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).createComponent(ThumbnailComponent);
        component = fixture.componentInstance;
        component.movie = movie;
        fixture.detectChanges();
        image = fixture.debugElement.query(By.css('img'));
    })

    it('should create component', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('show image in thumbnail img tag', () => {
        expect(image.nativeElement.src).toBe('https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2MzQyNTc1M15BMl5BanBnXkFtZTYwMjExNjc3._V1_SX300.jpg')
    });

    it('img has alt', () => {
        expect(image.nativeElement.alt).toBe('Hotel Rwanda');
    });

    it('has a table to show information', () => {
        const dbg = fixture.debugElement.query(By.css('table'));
        expect(dbg.componentInstance).toBeTruthy();
    });

    it('show movie title in caption', () => {
        const dbg = fixture.debugElement.query(By.css('table > tr:first-child > td:nth-child(2)'));
        expect(dbg.nativeElement.textContent).toBe('Hotel Rwanda');
    });

    it('show movie year in caption', () => {
        const dbg = fixture.debugElement.query(By.css('table > tr:nth-child(2) > td:nth-child(2)'));
        expect(dbg.nativeElement.textContent).toBe('2004');
    });

    it('button for openning menu', () => {
        const dbg = fixture.debugElement.query(By.css('figcaption > button'));
        expect(dbg.nativeElement).toBeTruthy();
    });

    it('button has a vertical dot icon', () => {
        const dbg = fixture.debugElement.query(By.css('figcaption > button > mat-icon'));
        expect(dbg.nativeElement.textContent).toBe('more_vert');
    });

    it('button for adding to favorites', (done) => {
        const dbg = fixture.debugElement.query(By.css('figcaption > button'));
        dbg.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const dbgFav = fixture.nativeElement.parentNode.querySelector('button:nth-child(2)');
            expect(dbgFav).toBeTruthy();
            done();
        })
    });

    it('button for adding to later', (done) => {
        const dbg = fixture.debugElement.query(By.css('figcaption > button'));
        dbg.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const dbgLater = fixture.nativeElement.parentNode.querySelector('button:nth-child(1)')
            expect(dbgLater).toBeTruthy();
            done();
        })
    });

    it('favorite button title is Add to Favorite', (done) => {
        const dbg = fixture.debugElement.query(By.css('figcaption > button'));
        dbg.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const dbgFav = fixture.nativeElement.parentNode.querySelector('button:nth-child(2) > .hidden > span');
            expect(dbgFav.textContent).toBe('Added to Favorite');
            done();
        })
    });

    it('later button title is Added to Later', (done) => {
        const dbg = fixture.debugElement.query(By.css('figcaption > button'));
        dbg.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const dbgLater = fixture.nativeElement.parentNode.querySelector('button:nth-child(1) > .hidden > span');
            expect(dbgLater.textContent).toBe('Added to Later');
            done();
        })
    });
});
