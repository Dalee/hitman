import {ajax} from 'rxjs/observable/dom/ajax';
import {REQUEST_DELETE_TAG} from '../constants/tag';
import {errorTagDeletion} from '../actions/tag';
import {requestDigest} from '../actions/digest';

export default function digest(action$) {
    return action$.ofType(REQUEST_DELETE_TAG)
        .switchMap(action => {
            return ajax.post(`/delete?path=${action.payload.path}&tag=${action.payload.tag}`)
                .map(() => requestDigest(action.payload.path))
                // eslint-disable-next-line dot-notation
                .catch(error => errorTagDeletion());
        });
}
