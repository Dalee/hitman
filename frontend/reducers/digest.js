import {
    REQUEST_DIGEST,
    REQUEST_DIGEST_ERROR,
    RECEIVE_DIGEST
} from '../constants/digest';

const initialState = {
    isLoading: false,
    isError: false
};

export default function digest(state = initialState, action) {
    switch (action.type) {
        case REQUEST_DIGEST:
            return Object.assign({}, state, action.payload, {
                isLoading: true,
                isError: false
            });

        case REQUEST_DIGEST_ERROR:
            return Object.assign({}, state, {
                isError: true,
                isLoading: false
            });

        case RECEIVE_DIGEST:
            return Object.assign({}, state, action.payload, {
                isLoading: false,
                isError: false
            });
    }

    return state;
}
