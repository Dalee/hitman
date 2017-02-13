import {combineEpics} from 'redux-observable';
import images from './images';
import digest from './digest';
import tag from './tag';

export default combineEpics(
    images,
    digest,
    tag
);
