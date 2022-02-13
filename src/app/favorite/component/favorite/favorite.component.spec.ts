import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FavoriteComponent } from './favorite.component';
import { FavoriteService } from '../../favorite.service';
import { By } from '@angular/platform-browser';

describe('FavoriteComponent: ', () => {
    let component: FavoriteComponent;
    let fixture: ComponentFixture<FavoriteComponent>;
    let service = jasmine.createSpyObj('FavoriteService', [ 'getFavoritesPagable' ]);

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ FavoriteComponent ],
            providers: [],
             schemas: [ NO_ERRORS_SCHEMA ]
        }).overrideComponent(FavoriteComponent, {
            set:{ 
                providers: [
                    {
                        provide: FavoriteService, useValue: service
                    }
                ]
            }
        }).createComponent(FavoriteComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should have a container', () => {
        const container = fixture.debugElement.query(By.css('.container')).nativeElement;
        expect(container).toBeTruthy();
    });

    it('should have a grid', () => {
        const grid = fixture.debugElement.query(By.css('bit-grid')).nativeElement;
        expect(grid).toBeTruthy();
    });
});
