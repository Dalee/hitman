export function viewLoading(state = false, action) {
    switch (action.type) {
        case 'VIEW_LOADING':
            return action.isLoading;
    }
    return state;
}

export function viewLoadError(state = false, action) {
    switch (action.type) {
        case 'VIEW_LOAD_ERROR':
            return action.isError;
    }
    return state;
}

export function view(state = null, action) {
    switch (action.type) {
        case 'VIEW_LOADED':
            return action.view;
    }
    return state;
}
