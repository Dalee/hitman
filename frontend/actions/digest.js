import {
    REQUEST_DIGEST,
    REQUEST_DIGEST_ERROR,
    RECEIVE_DIGEST
} from '../constants/digest';

/**
 * @param path
 * @returns {{type: string, payload: {path: *}}}
 */
export function requestDigest(path) {
    return {
        type: REQUEST_DIGEST,
        payload: {path}
    };
}

/**
 * @param digest
 * @returns {{type: string, payload: {digest: *}}}
 */
export function receiveDigest(digest) {
    return {
        type: RECEIVE_DIGEST,
        payload: {digest}
    };
}

/**
 * @returns {{type: string}}
 */
export function errorDigest() {
    return {
        type: REQUEST_DIGEST_ERROR
    };
}
