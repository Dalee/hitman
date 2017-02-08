export function viewLoading(bool) {
    return {
        type: 'VIEW_LOADING',
        isLoading: bool
    };
}

export function viewLoadError(bool) {
    return {
        type: 'VIEW_LOAD_ERROR',
        isError: bool
    };
}

export function viewLoaded(view) {
    return {
        type: 'VIEW_LOADED',
        view: view
    };
}

export function viewLoad(path) {
    return (dispatch) => {
        try {
            dispatch(viewLoading(true));
            fetch(`/image?path=${path}`)
                .then((response) => {
                    dispatch(viewLoading(false));
                    return response;
                })
                .then((data) => data.json())
                .then((view) => dispatch(viewLoaded(view)));

        } catch (e) {
            dispatch(viewLoadError(true));
        }
    };
}
