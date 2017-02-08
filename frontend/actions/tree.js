import {
    TREE_LOADING,
    TREE_LOAD_ERROR,
    TREE_LOADED
} from '../constants/tree';

export function treeLoading(isLoading) {
    return {
        type: TREE_LOADING,
        isLoading
    };
}

export function treeLoadError(isError) {
    return {
        type: TREE_LOAD_ERROR,
        isError
    };
}

export function treeLoaded(tree) {
    return {
        type: TREE_LOADED,
        tree
    };
}

export function treeLoad() {
    return dispatch => {
        try {
            dispatch(treeLoading(true));
            fetch('/tree')
                .then(response => {
                    dispatch(treeLoading(false));
                    return response;
                })
                .then(data => data.json())
                .then(tree => dispatch(treeLoaded(tree)));

        } catch (e) {
            dispatch(treeLoadError(true));
        }
    };
}
