const express = require('express');
const axios = require('axios');
const app = express();

app.get('/auth/qq/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const tokenResponse = await axios.get(`https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=YOUR_QQ_APP_ID&client_secret=YOUR_QQ_APP_SECRET&code=${code}&redirect_uri=YOUR_REDIRECT_URI`);
    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get(`https://graph.qq.com/user/get_user_info?access_token=${accessToken}&oauth_consumer_key=YOUR_QQ_APP_ID&openid=USER_OPEN_ID`);
    const userInfo = userResponse.data;
    // 在这里处理用户信息（例如，登录用户或创建新账户）
    res.redirect('/your_success_page');
  } catch (error) {
    res.redirect('/your_error_page');
  }
});

app.get('/auth/wechat/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const tokenResponse = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=YOUR_WECHAT_APP_ID&secret=YOUR_WECHAT_APP_SECRET&code=${code}&grant_type=authorization_code`);
    const accessToken = tokenResponse.data.access_token;
    const openid = tokenResponse.data.openid;
    const userResponse = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}`);
    const userInfo = userResponse.data;
    // 在这里处理用户信息（例如，登录用户或创建新账户）
    res.redirect('/your_success_page');
  } catch (error) {
    res.redirect('/your_error_page');
  }
});

app.listen(5500, () => {
  console.log('Server is running on port 5500');
});
