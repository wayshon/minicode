const axios = require('axios');

const getQRCode = ({ access_token, scene }) => {
    return new Promise((resolve, reject) => {
        if (!access_token) {
            reject('need params');
            return;
        }
        axios({
            url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`,
            method: 'post',
            data: {
                scene,
                page: 'pages/index/index',
            },
            responseType: 'arraybuffer' //此处是设置请求的为流文件
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err);
        });
    })
}

module.exports = getQRCode;