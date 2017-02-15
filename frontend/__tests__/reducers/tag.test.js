import reducer from '../../reducers/tag';
import {
    REQUEST_DELETE_TAG,
    REQUEST_DELETE_TAG_ERROR
} from '../../constants/tag';

describe('Tag reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            isError: false
        });
    });

    it('should handle REQUEST_DELETE_TAG', () => {
        const action = {
            type: REQUEST_DELETE_TAG,
            payload: {path: 'some/path', tag: 'latest'}
        };

        expect(reducer({}, action)).toEqual({
            path: 'some/path',
            tag: 'latest',
            isError: false
        });
    });

    it('should handle REQUEST_DELETE_TAG_ERROR', () => {
        expect(reducer({}, {type: REQUEST_DELETE_TAG_ERROR})).toEqual({
            isError: true
        });
    });

});
