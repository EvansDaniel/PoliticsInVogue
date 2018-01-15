import React, {Component} from 'react';
import './Article.less';
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import Comments from "../../components/Comments/Comments";
import PropTypes from 'prop-types';
const API = require('../../shared/api-v1');

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            articleMeterWidth: 0,
        };
    }

    componentDidMount() {
        if (!this.props.articleData) {
            const queryParams = {
                // TODO: fix this, check that state is defined
                    id: this.props.location.state.id
                },
                self = this;

            API.getArticle({
                success: function (res) {
                    self.setState({
                        loading: false,
                        articleData: res
                    });
                },
                params: queryParams
            });
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const articleData = this.state.articleData || this.props.articleData;
        return (
            <div className="Article">
                {
                    this.state.loading ? "Loading..." :
                        <ArticleContent articleData={articleData}/>
                }
            </div>
        );
    }
}

Article.proptypes = {
    // TODO: finalize articleData object type and add here as PropTypes.shape(<shape>)
    articleData: PropTypes.object.isRequired
};

export default Article;
