import {
    REQUEST_IMAGES,
    REQUEST_IMAGES_ERROR,
    RECEIVE_IMAGES
} from '../constants/images';

export function requestImages() {
    return {
        type: REQUEST_IMAGES
    };
}

export function receiveImages(images) {
    return {
        type: RECEIVE_IMAGES,
        payload: {images}
    };
}

export function errorImages() {
    return {
        type: REQUEST_IMAGES_ERROR
    };
}
