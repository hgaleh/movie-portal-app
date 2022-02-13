import { TestBed } from "@angular/core/testing";
import { InfinitScroll } from "./infinit-scroll";
import { InfiniteScrollService } from "./infinite-scroll.service";

describe('InfiniteScrollService test', () => {
    let service: InfiniteScrollService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InfiniteScrollService
            ]
        });
        service = TestBed.inject(InfiniteScrollService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getNewInfiniteScroll returns new infinitescroll', () => {
        expect(service.getNewInfiniteScroll()).toBeInstanceOf(InfinitScroll);
    });
});
