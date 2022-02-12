import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ImageLoadingDirective } from "./image-loading.directive";

@Component({
    template: `
        <img imageLoading>
    `
})
class TestComponent {

}

describe('image loading directive test', () => {

    let fixture: ComponentFixture<TestComponent>;
    let img: DebugElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                ImageLoadingDirective,
                TestComponent
            ]
        }).createComponent(TestComponent);
        fixture.detectChanges();
        img = fixture.debugElement.query(By.css('img'))
    })

    it('should be created', () => {
        const componen = fixture.componentInstance;
        expect(componen).toBeTruthy();
    });

    it('expect component to have class loading-with-directive', () => {
        expect(img.classes['loading-with-directive']).toBeTrue();
    });

    it('if image loads class loading-with-directive will remove', (done) => {
        img.nativeElement.dispatchEvent(new Event('load'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(img.classes['loading-with-directive']).toBeFalsy();
            done();
        });
    })

    it('if image errors class loading-with-directive will remove', (done) => {
        img.nativeElement.dispatchEvent(new Event('error'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const hasClass = !!img.classes['loading-with-directive'];
            expect(hasClass).toBeFalse();
            done();
        });
    });

    it('if image errors src changes', (done) => {
        img.nativeElement.dispatchEvent(new Event('error'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const src = img.nativeElement.src.split('/')
            const newSrc = src[src.length - 1];
            expect(newSrc).toBe('broken_image_black_24dp.svg');
            done();
        });
    });
});
