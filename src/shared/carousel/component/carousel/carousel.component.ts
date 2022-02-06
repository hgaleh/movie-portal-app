import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription } from "rxjs";

@Component({
    selector: 'bit-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: [ './carousel.component.scss' ]
})
export class CarouselComponent implements OnInit, OnDestroy {
    selectedSlide = 0;
    private subscription!: Subscription;
    slides = [0, 1, 2, 3, 4, 5];

    onSlideClick(slide: number): void {
        this.selectedSlide = slide;
    }
    
    
    ngOnInit(): void {
        this.subscription = interval(4000).subscribe(this.go.bind(this));
    }
    
    go(){
       this.selectedSlide = (this.selectedSlide + 1) % 6;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}