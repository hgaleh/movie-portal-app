import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';


describe('DashboardComponent test', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let activatedRouteMock = {
        queryParams: of()
    };
    let dashboardServiceMock: jasmine.SpyObj<DashboardService> = jasmine.createSpyObj(['getBestMovies', 'getMoviesPagable']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteMock }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).overrideComponent(DashboardComponent, {
            set: {
                providers: [
                    { provide: DashboardService, useValue: dashboardServiceMock }
                ]
            }
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('component has a carousel', () => {
        const carousel = fixture.debugElement.query(By.css('bit-carousel')).nativeElement;
        expect(carousel).toBeTruthy();
    });

    it('component has a grid', () => {
        const carousel = fixture.debugElement.query(By.css('bit-grid')).nativeElement;
        expect(carousel).toBeTruthy();
    });
});
