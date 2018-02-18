const validUrl = require('valid-url');
const empty = require('is-empty');
const editorUtils = require('../shared/utils/editor-utils');
const _ = require('lodash');


function checkImageUrl(url) {
    return validUrl.is_uri(url) && url.match(/\.(jpeg|jpg|gif|png)$/);
}

const validData = {
    valid: true
};
const invalidData = (message) => {
    return {
        valid: false,
        message: message
    }
};

function publishValidateArticleData(articleData, prefix) {
    if(!articleData) {
        return invalidData('Data is invalid: Category, article image, and title are required');
    }
    let message = (_.isString(prefix) && prefix.trim() + ': ') || '';
    if (empty(articleData.showcaseImage) ||
        !checkImageUrl(articleData.showcaseImage)) {
        return invalidData(message + 'Url provided must be a valid image url (ends in jpg, jpeg, gif, or png)');
    }
    if (empty(articleData.category)) {
        return invalidData(message + 'Must provide a category');
    }

    if(empty(articleData.title)) {
        return invalidData(message + 'Must provide a title');
    }

    if(empty(articleData.body) || editorUtils.editorStateIsEmpty(articleData.body)) {
        return invalidData(message + 'Article body is empty');
    }

    return validData;
}

function prePublishValidateArticleData(articleData, prefix) {
    if (!empty(articleData.showcaseImage) &&
        !checkImageUrl(articleData.showcaseImage)) {
        return invalidData('Url provided must be a valid image url (ends in jpg, jpeg, gif, or png)');
    }
    return validData;
}

module.exports = {
    checkImageUrl: checkImageUrl,
    publishValidateArticleData: publishValidateArticleData,
    prePublishValidateArticleData: prePublishValidateArticleData,
};