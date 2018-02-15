import {editorStateFromRaw} from 'megadraft-denistsuman';
import {stateToHTML} from 'draft-js-export-html';
import empty from 'is-empty';

const waitBeforeCall = (function () {
    let timeoutId = null;

    return function (func, timeToWait) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(func, timeToWait);
    }
})();

export {
    waitBeforeCall,
};