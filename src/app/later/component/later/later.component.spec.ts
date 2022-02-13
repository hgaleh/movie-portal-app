import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LaterComponent } from './later.component';
import { LaterService } from '../../later.service';
import { By } from '@angular/platform-browser';

describe('LaterComponent test', () => {
    let component: LaterComponent;
    let fixture: ComponentFixture<LaterComponent>;
    let service = jasmine.createSpyObj('LaterService', [ 'getLaterPagable' ]);

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ LaterComponent ],
            providers: [],
             schemas: [ NO_ERRORS_SCHEMA ]
        }).overrideComponent(LaterComponent, {
            set:{ 
                providers: [
                    {
                        provide: LaterService, useValue: service
                    }
                ]
            }
        }).createComponent(LaterComponent);
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
