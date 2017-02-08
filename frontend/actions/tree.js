export function treeLoading(bool) {
    return {
        type: 'TREE_LOADING',
        isLoading: bool
    };
}

export function treeLoadError(bool) {
    return {
        type: 'TREE_LOAD_ERROR',
        isError: bool
    };
}

export function treeLoaded(tree) {
    return {
        type: 'TREE_LOADED',
        tree: tree
    };
}

export function treeLoad() {
    return (dispatch) => {
        try {
            dispatch(treeLoading(true));
            fetch('/tree')
                .then((response) => {
                    dispatch(treeLoading(false));
                    return response;
                })
                .then((data) => data.json())
                .then((tree) => dispatch(treeLoaded(tree)));

        } catch (e) {
            dispatch(treeLoadError(true));
        }
    };
}
