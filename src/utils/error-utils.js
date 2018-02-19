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

// res is the result, i.e. the error, it used to be the response
const renderIfError = (error) => {
    if(error && error.val) {
        return (
            <Error error={error} goBackLink={true}/>
        );
    }
    return false;
};

export default {
    buildRenderError: buildRenderError,
    renderIfError: renderIfError
};