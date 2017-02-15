import reducer from '../../reducers/images';

import {
    REQUEST_IMAGES,
    REQUEST_IMAGES_ERROR,
    RECEIVE_IMAGES,
} from '../../constants/images';

describe('Images reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            isLoading: false,
            isError: false,
            images: {
                children: [],
                images: [],
                name: '/',
                path: '/'
            }
        });
    });

    it('should handle REQUEST_IMAGES', () => {
        expect(reducer({}, {type: REQUEST_IMAGES})).toEqual({
            isLoading: true,
            isError: false
        });
    });

    it('should handle REQUEST_IMAGES_ERROR', () => {
        expect(reducer({}, {type: REQUEST_IMAGES_ERROR})).toEqual({
            isLoading: false,
            isError: true
        });
    });

    it('should handle RECEIVE_IMAGES', () => {
        const action = {
            type: RECEIVE_IMAGES,
            payload: {
                children: [
                    {children: [], name: 'nested', path: 'nested/path', images: []}
                ],
                images: [],
                name: 'something',
                path: 'some/path'
            }
        };
        expect(reducer({}, action)).toEqual({
            isLoading: false,
            isError: false,
            children: [
                {children: [], name: 'nested', path: 'nested/path', images: []}
            ],
            images: [],
            name: 'something',
            path: 'some/path'
        });
    });

});
