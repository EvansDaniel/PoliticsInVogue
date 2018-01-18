const dotenv = require('dotenv'),
    dotEnvPath = '../.env';

dotenv.config({
    path: dotEnvPath
});

const client = require('scp2'),
    DOT_ENV_SERVER_PATH=`${process.env.SERVER_PROJECT_PATH}/server`;

client.scp(dotEnvPath, {
    host: process.env.SERVER_HOSTNAME,
    username: process.env.SERVER_USERNAME,
    privateKey: require('fs').readFileSync(process.env.SERVER_PRIVATE_KEY_PATH),
    passphrase: '',
    path: DOT_ENV_SERVER_PATH
}, function(err) {
   if(err) console.log(err);
   console.log(`${dotEnvPath} file transferred to ${process.env.SERVER_USERNAME}@${process.env.SERVER_HOSTNAME}:${DOT_ENV_SERVER_PATH}`);
});
