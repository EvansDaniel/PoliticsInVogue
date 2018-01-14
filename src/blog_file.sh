#!/bin/bash 

COMPONENT_DIR=src/components
MODULES_DIR=src/modules

if [[ -z $1 ]]; then
	echo "Must provide either components or modules dir";
	exit 1;
fi

CREATE_DIR=''

if [[ $1 != "modules" && $1 != "components" ]]; then
	echo "First arg must be either components or modules";
	exit 1;
fi

if [[ $1 == "components" ]]; then
	CREATE_DIR=$COMPONENT_DIR;
	CORRECT_FIRST_ARG=true
fi
if [[ $1 == "modules" ]]; then
	CREATE_DIR=$MODULES_DIR;
	CORRECT_FIRST_ARG=true
fi

if [[ -z $2 ]]; then
	echo "Must provide name of dir and files to create";
	exit 1;
fi

FILES_NAME=$2;

# cd to the project root directory
cd `git rev-parse --show-toplevel`

create_templates() {
	local FILE_NAME=$1
	local CREATE_DIR=$2
	check_answer "Are you sure you want to create $FILE_NAME.js and $FILE_NAME.less in $CREATE_DIR?"
	if [[ $? == 0 ]]; then
	echo "import React, {Component} from 'react';
import './$FILE_NAME.less'
import PropTypes from 'prop-types';

class $FILE_NAME extends Component {
	constructor(props) {
        super(props);
        
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="\"$FILE_NAME\"">
                
            </div>
        );
    }
}

export default $FILE_NAME;" > $FILE_NAME.js;
echo "@import \""../../shared/mixins.less\"";
@import \""../../shared/vars.less\"";

.$FILE_NAME {
}" > $FILE_NAME.less;
else
	rm -rf $CREATE_DIR;
	echo "Exiting";
fi
}

check_answer() {
	echo -n "$1 (y/n)";
	read answer;
	if [[ $answer == "y" || $answer == "Y" || $answer == "yes" || $answer == "YES" ]]; then
		return 0
	else
		return 1
	fi
}

check_dir() {
	ls | grep "$FILES_NAME" &> /dev/null
	if [[ $? -eq 0 ]]; then
		check_answer "Detected $FILES_NAME already created. Would you like to overwrite?"
		if [[ $? == 0 ]]; then
			echo "Overwriting"
			rm -rf $FILES_NAME;
		else
			echo "Exiting";
			exit 1
		fi
	fi
}

create_files() {
	local DIR=$1
	local FILES_NAME=$2;
	cd $DIR
	check_dir
	mkdir $FILES_NAME;
	cd $FILES_NAME;
	create_templates $FILES_NAME $PWD;
}

create_files $CREATE_DIR $FILES_NAME