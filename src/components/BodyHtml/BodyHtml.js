import React, {Component} from 'react';
import './BodyHtml.less'
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

class BodyHtml extends Component {

	render() {
        return (
            <div className="BodyHtml">
                {renderHTML(this.props.body)}
            </div>
        );
    }
}

BodyHtml.proptypes = {
    body: PropTypes.string.isRequired
};

export default BodyHtml;
