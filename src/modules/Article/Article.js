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
                    year: this.props.match.params.year,
                    month: this.props.match.params.month,
                    title: this.props.match.params.title
                },
                self = this;

            API.getArticle(function (res) {
                self.setState({
                    loading: false,
                    articleData: res
                });
            }, queryParams);
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
