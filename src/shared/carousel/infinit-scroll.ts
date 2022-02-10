import { BehaviorSubject, Subscription } from "rxjs";
import { interval } from "rxjs/internal/observable/interval";
import { animationFrameScheduler } from "rxjs/internal/scheduler/animationFrame";
import { Subject } from "rxjs/internal/Subject";
import { distinctUntilChanged, endWith, map, takeWhile } from "rxjs/operators";

export class InfinitScroll<T> {

    private scrollItems!: T[];
    private scrollLocationPosition = 0;
    private readonly scrollMargin = 100;
    scrollLeftChange = new Subject<number>();
    itemsChange = new BehaviorSubject<T[]>([]);
    private subscription = new Subscription();

    constructor(
        items: T[],
        private readonly itemWidth: number,
        private viewWidth: number
    ) {
        this.changeItems(items);
    }

    changeItems(val: T[]): void {
        this.scrollItems = [...val, ...val];
        this.itemsChange.next(this.scrollItems);
    }

    autoplay(): Subscription {
        return interval(25).subscribe(() => {
            this.lazyRight();
            this.scrollLocationPosition += 2;
            this.scrollLeftChange.next(this.scrollLocationPosition);
        });
    }

    changeViewWidth(vw: number): void {
        this.viewWidth = vw;
    }

    scrollLeft(): void {
        this.lazyLeft();
        this.changeLocationSmoothly(this.checkBoundriesForStartLocation(this.scrollLocationPosition - 300));
    }

    scrollRight(): void {
        this.lazyRight();
        this.changeLocationSmoothly(this.checkBoundriesForStartLocation(this.scrollLocationPosition + 300));
    }

    scroll(dx: number): void {
        this.lazyLeft();
        this.lazyRight();
        this.scrollLocationPosition -= dx;
        this.scrollLeftChange.next(this.scrollLocationPosition);
    }

    private lazyRight(): void {
        if (this.needLazyRight()) {
            this.scrollLocationPosition = this.scrollLocationPosition - (this.realLength / 2);
            this.scrollLeftChange.next(this.scrollLocationPosition);
        }
    }

    private lazyLeft(): void {
        if (this.needLazyLeft()) {
            this.scrollLocationPosition = this.scrollLocationPosition + (this.realLength / 2);
            this.scrollLeftChange.next(this.scrollLocationPosition);
        }
    }

    private checkBoundriesForStartLocation(val: number): number {
        const max = this.scrollItems.length * this.itemWidth - this.viewWidth;
        if (val > max) {
            return max;
        }
        return (val < 0) ? 0 : val;
    }

    private needLazyLeft(): boolean {
        return this.scrollLocationPosition < this.scrollMargin;
    }

    private needLazyRight(): boolean {
        return this.scrollLocationPosition + this.viewWidth > this.realLength - this.scrollMargin;
    }

    private get realLength(): number {
        return this.scrollItems.length * this.itemWidth;
    }

    private changeLocationSmoothly(to: number): void {
        this.subscription.unsubscribe();
        const duration = 500;
        const oldLocation = this.scrollLocationPosition;
        /**
         * Quadratic Ease-Out Function: f(x) = x * (2 - x)
         */
        const easeOutQuad = (x: number): number => x * (2 - x);
        
        // get the time when animation is triggered
        const startTime = animationFrameScheduler.now();
      
        this.subscription = interval(0, animationFrameScheduler).pipe(
            // calculate elapsed time
            map(() => animationFrameScheduler.now() - startTime),
            // calculate progress
            map((elapsedTime) => elapsedTime / duration),
            // complete when progress is greater than 1
            takeWhile((progress) => progress <= 1),
            // apply quadratic ease-out
            // for faster start and slower end of counting
            map(easeOutQuad),
            // calculate current count
            map((progress) => Math.round(progress * (to - oldLocation) + oldLocation)),
            // make sure that last emitted value is count
            endWith(to),
            distinctUntilChanged()
        ).subscribe(val => {
            this.scrollLocationPosition = val;
            this.scrollLeftChange.next(val);
        });
    }
}
