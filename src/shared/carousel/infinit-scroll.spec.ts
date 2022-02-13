import { Subscription, take } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { InfinitScroll } from "./infinit-scroll";

describe('InfinitScroll test', () => {
    let infiniteScroll: InfinitScroll<string>;
    let testScheduler: TestScheduler;
    let subscription: Subscription;

    beforeEach(() => {
        infiniteScroll = new InfinitScroll([
            'Item1',
            'Item2',
            'Item3',
            'Item4'
        ], 100, 400);

        testScheduler = new TestScheduler((act, exp) => {
            expect(act).toEqual(exp);
        })
    });

    it('should create', () => {
        expect(infiniteScroll).toBeTruthy();
    });

    it('changeItems changes scrollItems', () => {
        const newItems = ['Test'];
        infiniteScroll.changeItems(newItems);
        expect(infiniteScroll['scrollItems']).toEqual(['Test', 'Test']);
    });

    it('changeItems itemChange emits correct items', () => {
        testScheduler.run(helpers => {
            const { expectObservable } = helpers;
            const newItems = ['Test'];
            infiniteScroll.changeItems(newItems);
            expectObservable(infiniteScroll['itemsChange']).toBe('a', {a: ['Test', 'Test']})
        });
    });

    it('test autoplay', (done) => {
        const expected = [
            1, 2, 3, 4, 5
        ];
        subscription = infiniteScroll.scrollLeftChange.pipe(take(5)).subscribe(left => {
            expect(left).toBe(expected.shift() as number);
        }, null, done);
        infiniteScroll.autoplay();
    });

    it('test scroll -dx', (done) => {
        subscription = infiniteScroll.scrollLeftChange.pipe(take(1)).subscribe(left => {
            expect(left).toBe(20);
        }, null, done);
        infiniteScroll.scroll(-20);
    });

    it('test scroll +dx', (done) => {
        const expected = [400, 380];
        subscription = infiniteScroll.scrollLeftChange.pipe(take(2)).subscribe(left => {
            expect(left).toBe(expected.shift() as number);
        }, null, done);
        infiniteScroll.scroll(20);
    });

    it('checkBoundriesForStartLocation more than maximum', () => {
        const expected = 400;
        const real = infiniteScroll['checkBoundriesForStartLocation'](410);
        expect(real).toBe(expected);
    });

    it('checkBoundriesForStartLocation more than maximum', () => {
        const expected = 0;
        const real = infiniteScroll['checkBoundriesForStartLocation'](-5);
        expect(real).toBe(expected);
    });

    it('needLazyLeft less than margin', (done) => {
        subscription = infiniteScroll.scrollLeftChange.pipe(take(1)).subscribe(() => {
            expect(infiniteScroll['needLazyLeft']()).toBeTrue();
        }, null, done)
        infiniteScroll.scroll(-10);
    });

    it('needLazyLeft less than margin', (done) => {
        subscription = infiniteScroll.scrollLeftChange.pipe(take(1)).subscribe(() => {
            expect(infiniteScroll['needLazyRight']()).toBeTrue();
        }, null, done)
        infiniteScroll.scroll(10);
    });

    it('needLazyLeft more than margin', (done) => {
        subscription = infiniteScroll.scrollLeftChange.pipe(take(1)).subscribe(() => {
            expect(infiniteScroll['needLazyLeft']()).toBeFalse();
        }, null, done)
        infiniteScroll.scroll(-150);
    });

    it('needLazyLeft more than margin', (done) => {
        const expected = [true, false];
        subscription = infiniteScroll.scrollLeftChange.pipe(take(2)).subscribe(() => {
            expect(infiniteScroll['needLazyRight']()).toBe(expected.shift() as boolean);
        }, null, done)
        infiniteScroll.scroll(150);
    });

    it('realLength', () => {
        expect(infiniteScroll['realLength']).toBe(800);
    })

    afterEach(() => {
        subscription && subscription.unsubscribe();
    })
});
