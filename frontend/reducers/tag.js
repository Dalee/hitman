import {
    REQUEST_DELETE_TAG,
    REQUEST_DELETE_TAG_ERROR
} from '../constants/tag';

/**
 * Initial state
 *
 * @type {{isError: boolean}}
 */
const initialState = {
    isError: false
};

/**
 * Tag reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function tag(state = initialState, action) {
    switch (action.type) {
        case REQUEST_DELETE_TAG:
            return Object.assign({}, state, action.payload, {
                isError: false
            });

        case REQUEST_DELETE_TAG_ERROR:
            return Object.assign({}, state, {
                isError: true
            });
    }

    return state;
}
