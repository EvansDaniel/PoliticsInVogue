import React, {Component} from "react";
import "./Category.less";
import AlternatingArticleBlock from "../../components/AlternatingArticleBlock/AlternatingArticleBlock";

class Category extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const category = this.props.match.params.category;
    }

    render() {
        return (
            <div className="Category">
                <div className="category-title">{this.props.match.params.category}</div>
                <AlternatingArticleBlock/>
            </div>
        );
    }
}

export default Category;
