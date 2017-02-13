import {ajax} from 'rxjs/observable/dom/ajax';
import {REQUEST_DIGEST} from '../constants/digest';
import {receiveDigest, errorDigest} from '../actions/digest';

export default function digest(action$) {
    return action$.ofType(REQUEST_DIGEST)
        .map(action => action.payload.path)
        .switchMap(path => {
            return ajax.getJSON(`/image?path=${path}`)
                .map(response => receiveDigest(response))
                // eslint-disable-next-line dot-notation
                .catch(error => errorDigest());
        });
}
