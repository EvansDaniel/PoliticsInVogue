import {editorStateFromRaw, editorStateToJSON} from 'megadraft-denistsuman';
import {stateToHTML} from 'draft-js-export-html';
import empty from 'is-empty';
import renderHTML from 'react-render-html';

const _buildImageElementForBody = function(src, caption, rightsHolder) {
    const rightsHolderHtml = empty(rightsHolder) ?
        '' : `<div className="img-credit">(Credit: ${rightsHolder})</div>`;
    const captionHtml = `<div className="img-caption">${caption} ${rightsHolderHtml}</div>`;
    return [
        '<div className="body-image-wrapper">',
        `<img className="body-img" src="${src}"/>`,
        empty(caption) ? '' : captionHtml,
        '</div>'
    ].join('');
};

const getEditorStateFromJSON = function (editorStateJSON) {
    if(!empty(editorStateJSON)) {
        try {
            return editorStateFromRaw(JSON.parse(editorStateJSON));
        } catch(e) {
            // TODO: return empty editor state????
            return editorStateFromRaw(null); // ???
        }
    } else {
        // we have empty var, return empty editor state
        return editorStateFromRaw(null);
    }
};


// takes any of rawString, rawObject, editorState,
// or HTML and returns HTML version of the input
const jsonToHTML = function (rawString) {
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
            return stateToHTML(editorState.getCurrentContent(), options);
        } catch(e) {
            console.log(e);
            try {
                const editorState = editorStateFromRaw(rawString);
                return stateToHTML(editorState.getCurrentContent(), options);
            } catch(e1) {
                console.log(e1);
                try {
                    return stateToHTML(rawString, options);
                } catch(e2) {
                    console.log(e2);
                    return rawString
                }
            }
        }
    }
    return '';
};

const renderJSON = function (editorStateJSON) {
    const html = jsonToHTML(editorStateJSON);
    return renderHTML(html);
};

const getJSONFromEditorState = function (editorState) {
    return editorStateToJSON(editorState);
};

export {
    jsonToHTML,
    getEditorStateFromJSON,
    getJSONFromEditorState,
    renderJSON
}