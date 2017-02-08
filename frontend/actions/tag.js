import {viewLoad} from "./view";

export function tagDeleted(path, tag) {
    return {
        type: 'TAG_DELETED',
        image: {
            path: path,
            tag: tag
        }
    };
}

export function tagDeleteError(bool) {
    return {
        type: 'TAG_DELETE_ERROR',
        isError: bool
    };
}

export function deleteTag(path, tag) {
    return (dispatch) => {
        try {
            fetch(`/delete?path=${path}&tag=${tag}`, {method: 'POST'})
                .then((response) => {
                    dispatch(tagDeleted(path, tag));
                    return response;
                })
                .then(() => dispatch(viewLoad(path)));

        } catch (e) {
            dispatch(tagDeleteError(true));
        }
    };
}
