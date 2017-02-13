import {
    requestTagDeletion,
    errorTagDeletion
} from '../../actions/tag';

import {
    REQUEST_DELETE_TAG,
    REQUEST_DELETE_TAG_ERROR
} from '../../constants/tag';

describe('Tag actions', () => {

    it('requests tag deletion', () => {
        expect(requestTagDeletion('some/path', 'latest')).toMatchObject({
            type: REQUEST_DELETE_TAG,
            payload: {
                path: 'some/path',
                tag: 'latest'
            }
        });
    });

    it('requests tag deletion error', () => {
        expect(errorTagDeletion('some/path', 'latest')).toMatchObject({
            type: REQUEST_DELETE_TAG_ERROR
        });
    });

});
