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

    it('should request digest', () => {
        expect(requestDigest('some/path')).toMatchObject({
            type: REQUEST_DIGEST,
            payload: {
                path: 'some/path'
            }
        });
    });

    it('should request digest error', () => {
        expect(errorDigest()).toMatchObject({
            type: REQUEST_DIGEST_ERROR
        });
    });

    it('should receive digest', () => {
        const digest = {
            children: [
                {
                    path: 'some/path',
                    name: 'sha256:b7118c0e0609047e381faf8bb13dac2b0e81f61b65655c5d5540ec1cb319713d',
                    tags: ['latest']
                }
            ]
        };

        expect(receiveDigest(digest)).toMatchObject({
            type: RECEIVE_DIGEST,
            payload: {digest}
        });
    });

});
