import Error from '../components/Error/Error';
import React from 'react';

const renderIfError = (error, addGoBackLink) => {
    if(addGoBackLink !== false) {
        addGoBackLink = true;
    }

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
            <Error error={msg} goBackLink={addGoBackLink}/>
        );
    }
    return false;
};

export default {
    renderIfError: renderIfError
};