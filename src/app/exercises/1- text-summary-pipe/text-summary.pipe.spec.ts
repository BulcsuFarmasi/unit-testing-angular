import { TextSummaryPipe } from './text-summary.pipe';

describe('TextSummaryPipe', () => {
    let textSummaryPipe:TextSummaryPipe;

    beforeEach(() => {
        textSummaryPipe = new TextSummaryPipe();
    });

    it('should return empty string when parameter is an empty string', () => {
        expect(textSummaryPipe.transform('')).toBe('');
    });

    it('should return empty string when parameter is undefined', () => {
        expect(textSummaryPipe.transform(undefined)).toBe('');
    });

    it('should return empty string when parameter is null', () => {
        expect(textSummaryPipe.transform(null)).toBe('');
    });

    it('should return the same string its length smaller  then the limit', () => {
        const param = 'abcd';
        expect(textSummaryPipe.transform(param, 5)).toBe(param);
    });

    it('should return the same string  its length equal then the limit', () => {
        const param = 'abcde';
        expect(textSummaryPipe.transform(param, 5)).toBe(param);
    });

    it('should return truncated string plus ellipsis if its length greater then limit', () => {
        expect(textSummaryPipe.transform('abcdef', 5)).toBe('abcde...');
    });

    it('should set limit to 10 if limit is not provided', () => {
        expect(textSummaryPipe.transform('abcdefghijk')).toBe('abcdefghij...')
    })
})


