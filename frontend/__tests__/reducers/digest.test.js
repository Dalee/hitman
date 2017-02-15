import reducer from '../../reducers/digest';
import {
    REQUEST_DIGEST,
    RECEIVE_DIGEST,
    REQUEST_DIGEST_ERROR
} from '../../constants/digest';

describe('Digest reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            isLoading: false,
            isError: false
        });
    });

    it('should handle REQUEST_DIGEST', () => {
        const action = {
            type: REQUEST_DIGEST,
            payload: {path: 'some/path'}
        };

        expect(reducer({}, action)).toEqual({
            path: 'some/path',
            isLoading: true,
            isError: false
        });
    });

    it('should handle REQUEST_DIGEST_ERROR', () => {
        expect(reducer({}, {type: REQUEST_DIGEST_ERROR})).toEqual({
            isLoading: false,
            isError: true
        });
    });

    it('should handle RECEIVE_DIGEST', () => {
        const action = {
            type: RECEIVE_DIGEST,
            payload: {
                children: [
                    {
                        path: 'some/path',
                        name: 'sha256:b7118c0e0609047e381faf8bb13dac2b0e81f61b65655c5d5540ec1cb319713d',
                        tags: ['latest']
                    }
                ]
            }
        };

        expect(reducer({}, action)).toEqual({
            isLoading: false,
            isError: false,
            children: [
                {
                    path: 'some/path',
                    name: 'sha256:b7118c0e0609047e381faf8bb13dac2b0e81f61b65655c5d5540ec1cb319713d',
                    tags: ['latest']
                }
            ]
        });
    });

});
