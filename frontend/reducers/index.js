import {combineReducers} from 'redux';
import {tree, treeLoadError, treeLoading} from './tree';
import {view, viewLoadError, viewLoading} from './view';
import {tagDeleted, tagDeleteError} from './tag';

export default combineReducers({
    tree,
    treeLoadError,
    treeLoading,
    view,
    viewLoadError,
    viewLoading,
    tagDeleted,
    tagDeleteError
});
