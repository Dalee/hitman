import {
    REQUEST_IMAGES,
    REQUEST_IMAGES_ERROR,
    RECEIVE_IMAGES,
} from '../constants/images';

const initialState = {
    isLoading: false,
    isError: false,
    images: {
        children: [],
        images: [],
        name: '/',
        path: '/'
    }
};

export default function images(state = initialState, action) {
    switch (action.type) {
        case REQUEST_IMAGES:
            return Object.assign({}, state, {
                isLoading: true,
                isError: false
            });

        case REQUEST_IMAGES_ERROR:
            return Object.assign({}, state, {
                isError: true,
                isLoading: false
            });

        case RECEIVE_IMAGES:
            return Object.assign({}, state, action.payload, {
                isLoading: false,
                isError: false
            });
    }

    return state;
}
