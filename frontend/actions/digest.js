import {
    REQUEST_DIGEST,
    REQUEST_DIGEST_ERROR,
    RECEIVE_DIGEST
} from '../constants/digest';

export function requestDigest(path) {
    return {
        type: REQUEST_DIGEST,
        payload: {path}
    };
}

export function receiveDigest(digest) {
    return {
        type: RECEIVE_DIGEST,
        payload: {digest}
    };
}

export function errorDigest() {
    return {
        type: REQUEST_DIGEST_ERROR
    };
}
