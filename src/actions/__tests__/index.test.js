import * as actions from '..';

describe('actions', () => {
    it('should return setTrendData object', () => {
        expect(actions.setTrendData([])).toEqual({
            type: 'setTrendData',
            trendData: [],
        });
    });

    it('should return setIsLoading object', () => {
        expect(actions.setIsLoading(true)).toEqual({
            type: 'setIsLoading',
            isLoading: true,
        });
    });
});
