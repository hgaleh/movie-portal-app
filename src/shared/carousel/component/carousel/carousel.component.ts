import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { Movie } from "src/shared/grid/component/movie";
import { InfinitScroll } from "../infinit-scroll";

@Component({
    selector: 'bit-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: [ './carousel.component.scss' ]
})
export class CarouselComponent implements OnInit, OnDestroy {

    @ViewChild('cardList', { static: true }) cardList!: ElementRef;

    infinitScroll: InfinitScroll<Movie>;
    private subscription = new Subscription();
    private dragging!: boolean;
  
    constructor() {
      this.infinitScroll = new InfinitScroll(
        <Movie[]>[], 162, 0
      );
    }
  
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
  
    ngOnInit(): void {
      this.infinitScroll.changeViewWidth(this.cardList.nativeElement.offsetWidth);
      this.infinitScroll.scrollLeftChange.subscribe(left => {
        this.cardList.nativeElement.scrollLeft = left;
      });
      this.subscription = this.infinitScroll.autoplay();
    }
  
    @Input() set movieList(val: Movie[] | null) {
      this.infinitScroll.changeItems(val || []);
    }
  
    getImageUrl(brand: Movie) {
      return `url(${brand.posterUrl}), url(/assets/broken_image_black_24dp.svg)`;
    }
  
    prev(): void {
      this.infinitScroll.scrollLeft();
    }

    trackByFn(index: number, item: Movie): any {
        return item.id;
    }
  
    next(): void {
      this.infinitScroll.scrollRight();
    }
  
    onDragStart(e: Event): void {
      e.preventDefault();
      this.subscription.unsubscribe();
      this.dragging = true;
    }
  
    onDrag(e: MouseEvent): void {
      e.preventDefault();
      if (this.dragging) {
        this.infinitScroll.scroll(e.movementX);
      }
    }
  
    onDragEnd(e: MouseEvent): void {
      e.preventDefault();
      if (this.dragging) {
        this.dragging = false;
        this.subscription = this.infinitScroll.autoplay();
      }
    }
}