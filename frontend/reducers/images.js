import {
    REQUEST_IMAGES,
    REQUEST_IMAGES_ERROR,
    RECEIVE_IMAGES,
} from '../constants/images';

/**
 * Initial state
 *
 * @type {{
 *  isLoading: boolean,
 *  isError: boolean,
 *  images: {
 *      children: Array,
 *      images: Array,
 *      name: string,
 *      path: string
 *  }
 * }}
 */
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

/**
 * Images reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
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
