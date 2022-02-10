import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { InfiniteScrollService } from '../../infinite-scroll.service';



describe('ReplaceWithYourComponent: ', () => {
    let component: CarouselComponent;
    let fixture: ComponentFixture<CarouselComponent>;
    const fakeService = jasmine.createSpyObj('fakeInfiniteScrollService', ['getNewInfiniteScroll']);
    const fakeInfiniteScroll = jasmine.createSpyObj('fakeInfiniteScroll', [
        'changeItems', 'autoplay', 'changeViewWidth',
        'scrollLeft', 'scrollRight', 'scroll', 'lazyRight',
        'lazyLeft', 'checkBoundriesForStartLocation', 'needLazyLeft',
        'needLazyRight', 'changeLocationSmoothly'
    ]);
    const subscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
    fakeService.getNewInfiniteScroll = jasmine.createSpy('getNewInfiniteScroll').and.
        returnValue(fakeInfiniteScroll);
    const scrollLeftChange = jasmine.createSpyObj('scrollLeftChange', ['subscribe']);
    fakeInfiniteScroll.scrollLeftChange = scrollLeftChange;
    fakeInfiniteScroll.autoplay = jasmine.createSpy('autoplay').and.returnValue(subscription);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CarouselComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).overrideComponent(CarouselComponent, {
            set: {
                providers: [
                    {
                        provide: InfiniteScrollService, useValue: fakeService
                    }
                ]
            }
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
