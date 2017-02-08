import {
    VIEW_LOADING,
    VIEW_LOAD_ERROR,
    VIEW_LOADED
} from '../constants/view';

export function viewLoading(isLoading) {
    return {
        type: VIEW_LOADING,
        isLoading
    };
}

export function viewLoadError(isError) {
    return {
        type: VIEW_LOAD_ERROR,
        isError
    };
}

export function viewLoaded(view) {
    return {
        type: VIEW_LOADED,
        view
    };
}

export function viewLoad(path) {
    return dispatch => {
        try {
            dispatch(viewLoading(true));
            fetch(`/image?path=${path}`)
                .then(response => {
                    dispatch(viewLoading(false));
                    return response;
                })
                .then(data => data.json())
                .then(view => dispatch(viewLoaded(view)));

        } catch (e) {
            dispatch(viewLoadError(true));
        }
    };
}
