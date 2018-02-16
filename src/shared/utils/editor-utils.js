// import {editorStateFromRaw, editorStateToJSON} from 'megadraft-denistsuman';
const Megadraft = require('megadraft-denistsuman');
const draftJSExport = require('draft-js-export-html');
const empty = require('is-empty');
const reactRender = require('react-render-html');

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
            return Megadraft.editorStateFromRaw(JSON.parse(editorStateJSON));
        } catch(e) {
            // TODO: return empty editor state????
            return Megadraft.editorStateFromRaw(null); // ???
        }
    } else {
        // we have empty var, return empty editor state
        return Megadraft.editorStateFromRaw(null);
    }
};

const editorStateIsEmpty = (editorStateJSON) => {
    const editorState = getEditorStateFromJSON(editorStateJSON);
    return !editorState.getCurrentContent().hasText();
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
            let editorState = Megadraft.editorStateFromRaw(raw);
            return draftJSExport.stateToHTML(editorState.getCurrentContent(), options);
        } catch(e) {
            console.log(e);
            try {
                const editorState = Megadraft.editorStateFromRaw(rawString);
                return draftJSExport.stateToHTML(editorState.getCurrentContent(), options);
            } catch(e1) {
                console.log(e1);
                try {
                    return draftJSExport.stateToHTML(rawString, options);
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
    return reactRender.renderHTML(html);
};

const getJSONFromEditorState = function (editorState) {
    return Megadraft.editorStateToJSON(editorState);
};

module.exports = {
    jsonToHTML: jsonToHTML,
    getEditorStateFromJSON: getEditorStateFromJSON,
    getJSONFromEditorState: getJSONFromEditorState,
    renderJSON: renderJSON,
    editorStateIsEmpty: editorStateIsEmpty
};