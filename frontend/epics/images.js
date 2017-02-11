import {ajax} from 'rxjs/observable/dom/ajax';
import {REQUEST_IMAGES} from '../constants/images';
import {receiveImages, errorImages} from '../actions/images';

export default function tree(action$) {
    return action$.ofType(REQUEST_IMAGES)
        .switchMap(() => {
            return ajax.getJSON('/tree')
                .map(response => receiveImages(response))
                .catch(error => errorImages());
        });
}
