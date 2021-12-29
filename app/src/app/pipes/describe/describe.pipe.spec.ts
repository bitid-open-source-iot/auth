import { DescribePipe } from './describe.pipe';

describe('ConvertPipe', () => {
    it('create an instance', () => {
        const pipe = new DescribePipe();
        expect(pipe).toBeTruthy();
    });
});
