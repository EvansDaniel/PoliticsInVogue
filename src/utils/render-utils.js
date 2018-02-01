import Error from '../components/Error/Error';
import React from 'react';

const renderIfError = (error) => {
    if(error.val) {
        return (
            <Error error={error.message || 'There was an error. Please try again later'}/>
        );
    }
    return false;
};

export default {
    renderIfError: renderIfError
};