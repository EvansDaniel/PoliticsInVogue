import {convertToRaw} from 'draft-js';
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

const _buildImageElementForBody = function(src, caption, rightsHolder) {
    const rightsHolderHtml = empty(rightsHolder) ?
        '' : '<div className="img-credit">Credit:' + rightsHolder + '</div>';
    return [
        '<div className="body-image-wrapper">',
        '<img className="body-img" src="' + src + '"/>',
        empty(caption) ? '' : '<div className="img-caption">' + caption + rightsHolderHtml + '</div>',
        '</div>'
    ].join('');
}

// takes any of rawString, rawObject, editorState,
// or HTML and returns HTML version of the input
const rawToHTML = function (rawString) {
    let options = {
        defaultBlockTag: 'p',
        blockRenderers: {
            atomic: (block) => {
                let data = block.getData();
                if (data.get('type') === 'image') {
                    return _buildImageElementForBody(data.get('src'),
                        data.get('caption'),
                        data.get('rightsHolder'))
                }
            },
        },
    };
    if (rawString) {
        try {
            let raw = JSON.parse(rawString);
            let editorState = editorStateFromRaw(raw);
            console.log('here1')
            return stateToHTML(editorState.getCurrentContent(), options);
        } catch(e) {
            console.log(e);
            try {
                const editorState = editorStateFromRaw(rawString);
                console.log('here2')
                return stateToHTML(editorState.getCurrentContent(), options);
            } catch(e1) {
                console.log(e1);
                try {
                    console.log('here3')
                    return stateToHTML(rawString, options);
                } catch(e2) {
                    console.log(e2);
                    console.log('here4')
                    return rawString
                }
            }
        }
    }
};

const getEditorStateFromRaw = function (raw) {
    console.log('raw', raw);
    if(!empty(raw)) {
        try {
            console.log('here');
            return editorStateFromRaw(JSON.parse(raw));
        } catch(e) {
            console.log('here1');
            // TODO: return empty editor state
            return editorStateFromRaw(null); // ???
        }
    } else {
        return editorStateFromRaw(null);
    }
};

export {
    waitBeforeCall,
    rawToHTML,
    getEditorStateFromRaw
};