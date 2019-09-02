const express = require('express');
const router = express.Router();
const getAccessToken = require('../controller/accessToken');
const getQRCode = require('../controller/getQRCode');

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/code', async (req, res, next) => {
  const { appid, secret, scene="test" } = req.body;
  if (!appid || !secret) {
    res.json({
      code: 1,
      msg: '缺参数'
    });
    return;
  }

  try {
    const access_token = await getAccessToken({ appid, secret });
    const origin_buffer = await getQRCode({ access_token, scene });

    // 保存图片
    // fs.writeFile(`${__dirname}/../public/images/test.png`, origin_buffer, (err) => {
    //   if(err) {
    //     console.log(err)
    //   } else {
    //     console.log('insert')
    //   }
    // });

    // 返回 base64
    // const base64Image = origin_buffer.toString('base64');
    // res.render('code', {
    //   data: `data:image/jpg;base64,${base64Image}`
    // });

    // 直接返回图片
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.write(origin_buffer);
    res.end();

  } catch(e) {
    res.render('code', {
      errMsg: '生成二维码失败'
    });
  }
});

module.exports = router;
