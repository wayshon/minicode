const axios = require('axios');

const getAccessToken = ({ appid, secret }) => {
    return new Promise((resolve, reject) => {
        if (!appid || !secret) {
            reject('need params');
            return;
        }
        axios.get('https://api.weixin.qq.com/cgi-bin/token', {
            params: {
                'grant_type': 'client_credential',
                appid,
                secret
            }
        })
        .then((response) => {
            if (response.data.access_token) {
                resolve(response.data.access_token);
            } else {
                resolve('query error');
            }
        })
        .catch((error) => {
            reject(error)
        });
    })
}

module.exports = getAccessToken;