import React, {Component} from 'react';
import './SocialMediaBlock.less'
import SocialShare from "../SocialShare/SocialShare";

class SocialMediaBlock extends Component {
    render() {
        const socialMedias = [
            'facebook', 'twitter','linkedin',
            'pinterest','email',
        ];
        const articleData = this.props.articleData;
        return (
            <div className="SocialMediaBlock">
                {
                    socialMedias.map(function (socialMedia, index) {
                        return (
                          <SocialShare key={index}
                                       articleData={articleData}
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
