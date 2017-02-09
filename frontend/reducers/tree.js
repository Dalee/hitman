import {
    TREE_LOADING,
    TREE_LOAD_ERROR,
    TREE_LOADED
} from '../constants/tree';

export function treeLoading(state = false, action) {
    switch (action.type) {
        case TREE_LOADING:
            return action.isLoading;
    }
    return state;
}

export function treeLoadError(state = false, action) {
    switch (action.type) {
        case TREE_LOAD_ERROR:
            return action.isError;
    }
    return state;
}

export function tree(state = null, action) {
    switch (action.type) {
        case TREE_LOADED:
            return action.tree;
    }
    return state;
}
