import React, {Component} from 'react';
import './Comments.less'

class Comments extends Component {
    componentDidMount() {
        // If we clicked a link to direct us to a page that loads
        // comments, we need to run window.fbAsyncInit() to get facebook to reload them
        // If we refreshed the page on a page that loads comments, window.fbAsyncInit will
        // not work because the fb sdk is not defined yet (this is loaded once App the components mounts)
        // therefore we wrap this call in a try/catch block. Also, if we just refreshed when App mounts,
        // comments will show up because it just loaded fb sdk
        try {
            window.fbAsyncInit && window.fbAsyncInit();
        } catch(e) {

        }
    }

    render() {
        return (
            <div className="Comments">
                <div className="fb-comments" data-href="http://www.politicsinvogue.com" data-width="100%">
                </div>
            </div>
        );
    }
}

export default Comments;
