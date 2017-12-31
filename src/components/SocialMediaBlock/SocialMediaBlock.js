import React, {Component} from 'react';
import './SocialMediaBlock.less'
import SocialShare from "../SocialShare/SocialShare";

class SocialMediaBlock extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const socialMedias = [
            'facebook', 'twitter','linkedin',
            'pinterest','email',
        ];
        const articleData = this.props.articleData;
        return (
            <div className="SocialMediaBlock">
                {
                    socialMedias.map(function (socialMedia) {
                        return (
                          <SocialShare articleData={articleData}
                                       type={socialMedia}
                          />
                        );
                    })
                }
            </div>
        );
    }
}

export default SocialMediaBlock;
