import {
    REQUEST_DELETE_TAG,
    REQUEST_DELETE_TAG_ERROR
} from '../constants/tag';

export function requestTagDeletion(path, tag) {
    return {
        type: REQUEST_DELETE_TAG,
        payload: {path, tag}
    };
}

export function errorTagDeletion() {
    return {
        type: REQUEST_DELETE_TAG_ERROR
    };
}
