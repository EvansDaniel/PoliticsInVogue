import Error from '../components/Error/Error';
import React from 'react';

/**
 *
 * @param val true if there is an error
 * @param res the response from the server, possibly null
 * @param message the message to the user for Error popup
 * @returns {{val: boolean, res: *, message: string}}
 */
const buildRenderError = (val, res, message) => {
    return {
        val: val,
        res: res,
        message: message
    }
};

const renderIfError = (error) => {
    if(error && error.val) {
        let msg = error.message || 'There was an error. Please try again later';
        // when res is provided, we check that status code to send a default message to user
        // and it will overwrite error.message
        if(error.res) {
            if(error.res.status === 404) {
                msg = 'It looks like the resource you were searching for doesn\'t exist'
            }
        }
        return (
            <Error error={msg} goBackLink={true}/>
        );
    }
    return false;
};

export default {
    buildRenderError: buildRenderError,
    renderIfError: renderIfError
};