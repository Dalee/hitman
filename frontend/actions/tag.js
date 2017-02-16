import {
    REQUEST_DELETE_TAG,
    REQUEST_DELETE_TAG_ERROR
} from '../constants/tag';

/**
 * @param {string} path
 * @param {string} tag
 * @returns {{type: string, payload: {path: *, tag: *}}}
 */
export function requestTagDeletion(path, tag) {
    return {
        type: REQUEST_DELETE_TAG,
        payload: {path, tag}
    };
}

/**
 * @returns {{type: string}}
 */
export function errorTagDeletion() {
    return {
        type: REQUEST_DELETE_TAG_ERROR
    };
}
