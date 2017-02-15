import {
    requestTagDeletion,
    errorTagDeletion
} from '../../actions/tag';

import {
    REQUEST_DELETE_TAG,
    REQUEST_DELETE_TAG_ERROR
} from '../../constants/tag';

describe('Tag actions', () => {

    it('should request tag deletion', () => {
        expect(requestTagDeletion('some/path', 'latest')).toMatchObject({
            type: REQUEST_DELETE_TAG,
            payload: {
                path: 'some/path',
                tag: 'latest'
            }
        });
    });

    it('should request tag deletion error', () => {
        expect(errorTagDeletion()).toMatchObject({
            type: REQUEST_DELETE_TAG_ERROR
        });
    });

});
