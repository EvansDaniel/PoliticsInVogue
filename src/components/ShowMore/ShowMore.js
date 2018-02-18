import React, {Component} from 'react';
import './ShowMore.less'
import classNames from 'classnames';

class ShowMore extends Component {
	constructor(props) {
        super(props);

        this.onShowingChange = this.onShowingChange.bind(this);
        this.state = {
            showMore: false
        }
    }

    onShowingChange() {
	    this.setState({
            showMore: !this.state.showMore
        });
	}

    render() {
        return (
            <div className={classNames('ShowMore', {'hide': !this.state.showMore, 'show': this.state.showMore})}>
                <div onClick={this.onShowingChange} className="show-text">{this.state.showMore ? 'Show less' : 'Show more'}</div>
                {this.props.children}
            </div>
        );
    }
}

export default ShowMore;
