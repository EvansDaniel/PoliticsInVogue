import React, {Component} from 'react';
import './BodyHtml.less'
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
const editorUtils = require('../../shared/utils/editor-utils');

// TODO: change names, etc. to component that renders editorState???
class BodyHtml extends Component {

	render() {
        return (
            <div className="BodyHtml">
                {renderHTML(editorUtils.jsonToHTML(this.props.body))}
            </div>
        );
    }
}

BodyHtml.proptypes = {
    body: PropTypes.string.isRequired
};

export default BodyHtml;
