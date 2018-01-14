#!/bin/bash

if [[ -z $1 ]]; then
    echo "Must provide the model name"
    exit 1
fi

SERVER_COMPONENTS_ROOT=~/WebstormProjects/a-really-awesome-blog/server/components

# e.g. Article.js
MODEL=$1
# Assumes give upper case words, convert to camel case
MODEL_LOWER=`rest=${MODEL:1}; fl=${MODEL:0:1}; echo ${fl,,}${rest}`
MODEL_FILE="$MODEL".js
# e.g. ArticleDataService.js
SERVICE="$MODEL"DataService
SERVICE_FILE="$SERVICE".js

# e.g. ArticleBootstrap.js
BOOTSTRAP="$MODEL"Bootstrap
BOOTSTRAP_FILE="$BOOTSTRAP".js
# e.g. ArticleRoutes.js
ROUTES="$MODEL"Routes
ROUTES_FILE="$ROUTES".js

# TODO: check if dir exists
cd ${SERVER_COMPONENTS_ROOT}
# TODO: check if dir exists
mkdir -p ${MODEL}

cd ${MODEL}
touch ${SERVICE_FILE}
touch ${BOOTSTRAP_FILE}
touch ${ROUTES_FILE}
touch ${MODEL_FILE}

# TODO: check for each file if has content before overwriting
if [[ `cat ${MODEL_FILE} | wc -l` -eq 0 ]]; then
echo "const Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

const ${MODEL}Schema = new Schema({

});

const ${MODEL} = Mongoose.model('${MODEL}', ${MODEL}Schema);

module.exports = ${MODEL};
" > ${MODEL_FILE}

else
    echo "Aborting for ${MODEL_FILE}, not empty"
fi

if [[ `cat ${SERVICE_FILE} | wc -l` -eq 0 ]]; then
    MODEL_DATA=${MODEL_LOWER}Data
    NEW_MODEL=new${MODEL}
    echo "const serviceUtils = require('../../utils/service-utils');

const ${SERVICE} = function (${MODEL}) {
    return {
        create: function (${MODEL_DATA}, cb) {
            // TODO: look up validation stuff for mongoose
            const new${MODEL} = new ${MODEL}(${MODEL_DATA});
            console.log(${MODEL_DATA});
            ${NEW_MODEL}.save(cb);
        },

        update: function (${MODEL_DATA}, cb) {
            // TODO: check if _id is present
            ${MODEL}.update({ _id: ${MODEL_DATA}._id }, ${MODEL_DATA},
                function (err, raw) {
                console.log('Mongo raw', raw);
                return cb(err, raw);
            });
        },

        delete: function (id, cb) {
            return false;
        },
    }
};

module.exports = ${SERVICE};
" > ${SERVICE_FILE}
else
    echo "Aborting for ${SERVICE_FILE}, not empty"
fi

if [[ `cat ${BOOTSTRAP_FILE} | wc -l` -eq 0 ]]; then
    echo "// TODO: figure out a better way to do this
const API_URLS = require('../../../src/shared/api-urls');
const routeUtils = require('../../utils/route-utils');

const ${BOOTSTRAP} = function (app) {
    const ${MODEL} = require('./${MODEL}');
    const ${SERVICE} = require('./${SERVICE}')(${MODEL});
    const ${ROUTES} = require('./${ROUTES}')(${SERVICE});

    // define app.get/post routes here
};

module.exports = ${BOOTSTRAP};
" > ${BOOTSTRAP_FILE}
else
    echo "Aborting for ${BOOTSTRAP_FILE}, not empty"
fi

if [[ `cat ${ROUTES_FILE} | wc -l` -eq 0 ]]; then
    echo "const routeUtils = require('../../utils/route-utils');
const HttpError = require('http-error');

const ${ROUTES} = function (${SERVICE}) {

    // route handles go here

    return {

    };
};

module.exports = ${ROUTES};
" > ${ROUTES_FILE}
else
    echo "Aborting for ${BOOTSTRAP_FILE}, not empty"
fi