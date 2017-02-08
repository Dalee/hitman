export function tagDeleted(state = false, action) {
    switch (action.type) {
        case 'TAG_DELETED':
            return action.image;
    }
    return state;
}

export function tagDeleteError(state = false, action) {
    switch (action.type) {
        case 'TAG_DELETE_ERROR':
            return action.isError;
    }

    return state;
}
