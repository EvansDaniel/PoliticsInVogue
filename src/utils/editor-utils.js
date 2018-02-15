import {convertToRaw} from 'draft-js';
import {editorStateFromRaw, editorStateToJSON} from 'megadraft-denistsuman';
import {stateToHTML} from 'draft-js-export-html';

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


// takes any of rawString, rawObject, editorState,
// or HTML and returns HTML version of the input
const JSONToHTML = function (rawString) {
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

const getJSONFromEditorState = function (editorState) {
    return editorStateToJSON(editorState);
};

export {
    JSONToHTML,
    getEditorStateFromRaw,
    getJSONFromEditorState
}