import { DecadePipe } from "./decade.pipe";

describe('DecadePipe test', () => {
    let pipe: DecadePipe;

    beforeEach(() => {
        pipe = new DecadePipe();        
    })

    it('can create', () => {
        expect(pipe).toBeTruthy();
    });

    it('vale null shows placeholder', () => {
        const res = pipe.transform(null);
        expect(res).toBe('All Decades');
    });

    it('vale undefined shows placeholder', () => {
        const res = pipe.transform(undefined);
        expect(res).toBe('All Decades');
    });

    it('vale 10 shows 10-20', () => {
        const res = pipe.transform(10);
        expect(res).toBe('10 - 20');
    });

});
