import {combineReducers} from 'redux';
import images from './images';
import digest from './digest';
import tag from './tag';

/**
 * Combines all provided reducers
 */
export default combineReducers({
    images,
    digest,
    tag
});
