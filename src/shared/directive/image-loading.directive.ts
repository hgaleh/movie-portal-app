import { Directive, HostBinding, HostListener, OnInit, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[imageLoading]'
})
export class ImageLoadingDirective {

    @HostBinding('class.loading-with-directive') loading = true;

    @HostListener('error', ['$event.target'])
    onError(e: HTMLImageElement): void {
        e.classList.remove('loading-with-directive');
        e.src = '/assets/broken_image_black_24dp.svg';
    }

    @HostListener('load', ['$event.target'])
    onLoad(e: HTMLImageElement): void {
        e.classList.remove('loading-with-directive');
    }
}