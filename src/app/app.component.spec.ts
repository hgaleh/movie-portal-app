import { trigger } from '@angular/animations';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

@Component({
    selector: 'router-outlet',
    exportAs: 'outlet',
})
class MockRouterOutlet {
    activatedRouteData: any;
    constructor() {
        this.activatedRouteData = {
            animation: 'Home'
        }
    }
}

describe('AppComponent test', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let fb = jasmine.createSpyObj('FormBuilder', [ 'control' ]);
    let router = jasmine.createSpyObj('Router', [ 'navigate' ]);
    fb.control = jasmine.createSpy('control').and.returnValue({
        valueChanges: of()
    });

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MockRouterOutlet
            ],
            providers: [
                { provide: FormBuilder, useValue: fb },
                { provide: Router, useValue: router },
            ],
            imports: [
                NoopAnimationsModule
            ],
             schemas: [ NO_ERRORS_SCHEMA ]
        }).overrideComponent(AppComponent, {
            set: {
                animations: [
                    trigger('routeAnimations', [])
                ]
            }
        }).createComponent(AppComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should have a toolbar', () => {
        const toolbar = fixture.debugElement.query(By.css('mat-toolbar')).nativeElement;
        expect(toolbar).toBeTruthy();
    });

    it('should have a sidenav-container', () => {
        const sidebar = fixture.debugElement.query(By.css('mat-sidenav-container')).nativeElement;
        expect(sidebar).toBeTruthy();
    });
});
