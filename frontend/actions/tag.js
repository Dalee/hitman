import {viewLoad} from './view';
import {
    TAG_DELETED,
    TAG_DELETE_ERROR
} from '../constants/tag';

export function tagDeleted(path, tag) {
    return {
        type: TAG_DELETED,
        image: {path, tag}
    };
}

export function tagDeleteError(isError) {
    return {
        type: TAG_DELETE_ERROR,
        isError
    };
}

export function deleteTag(path, tag) {
    return dispatch => {
        try {
            fetch(`/delete?path=${path}&tag=${tag}`, {method: 'POST'})
                .then(response => {
                    dispatch(tagDeleted(path, tag));
                    return response;
                })
                .then(() => dispatch(viewLoad(path)));

        } catch (e) {
            dispatch(tagDeleteError(true));
        }
    };
}
