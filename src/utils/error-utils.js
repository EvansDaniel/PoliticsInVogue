import Error from '../components/Error/Error';
import React from 'react';

const buildRenderError = (val, res, message) => {
    return {
        val: val,
        res: res,
        message: message
    }
};

export default {
    buildRenderError: buildRenderError
};