import {
    REQUEST_IMAGES,
    REQUEST_IMAGES_ERROR,
    RECEIVE_IMAGES
} from '../constants/images';

/**
 * @returns {{type: string}}
 */
export function requestImages() {
    return {
        type: REQUEST_IMAGES
    };
}

/**
 * @param images
 * @returns {{type: string, payload: {images: *}}}
 */
export function receiveImages(images) {
    return {
        type: RECEIVE_IMAGES,
        payload: {images}
    };
}

/**
 * @returns {{type: string}}
 */
export function errorImages() {
    return {
        type: REQUEST_IMAGES_ERROR
    };
}
