import {
    requestDigest,
    receiveDigest,
    errorDigest
} from '../../actions/digest';
import {
    REQUEST_DIGEST,
    REQUEST_DIGEST_ERROR,
    RECEIVE_DIGEST
} from '../../constants/digest';

describe('Digest actions', () => {

    it('requests digest', () => {
        expect(requestDigest('/')).toMatchObject({
            type: REQUEST_DIGEST,
            payload: {
                path: '/'
            }
        });
    });

    it('requests digest error', () => {
        expect(errorDigest()).toMatchObject({
            type: REQUEST_DIGEST_ERROR
        });
    });

    it('receives digest', () => {
        expect(receiveDigest('danone/dumsl')).toMatchObject({
            type: RECEIVE_DIGEST,
            payload: {
                digest: 'danone/dumsl'
            }
        });
    });

});
