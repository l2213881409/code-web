      
const path = require("path"); // 用于处理文件路径
const tencentcloud = require("tencentcloud-sdk-nodejs"); // 用于调用腾讯云 OCR API
const express = require('express');
const multer = require('multer'); // 用于处理文件上传
const fs = require('fs'); 

const app = express();
const upload = multer({ dest: "uploads/" }); // 文件上传的目标目录

// 将public文件夹设置为静态文件目录
app.use(express.static(path.join(__dirname, 'images')));

// 处理根路径的GET请求
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'uplodas', req.file.filename));
});

// 设置腾讯云 OCR API 参数
const OcrClient = tencentcloud.ocr.v20181119.Client;
const clientConfig = {
  credential: {
    secretId: "AKIDLwxrfHgzGoFZieNsGVXLHB1gClI5f2HL", // 腾讯云 API 密钥 SecretId
    secretKey: "wfCmJo8F9tQvCLJ7Zv6NWSCj2A6qOl4D", // 腾讯云 API 密钥 SecretKey
  },
  region: "ap-guangzhou", // OCR API 所在地域
  profile: {
    httpProfile: {
      endpoint: "ocr.tencentcloudapi.com", // OCR API 接口地址
    },
  },
};
const client = new OcrClient(clientConfig); // 创建 OCR API 客户端

// 处理 OCR 请求的路由处理函数
app.post("/ocr", upload.single("image"), (req, res) => {
  const imagePath = path.join(__dirname, 'uploads', req.file.filename); // 确保正确的文件路径
  
  const imageBase64 = fs.readFileSync(imagePath, 'base64');
  const params = {
    "ImageBase64": imageBase64,
  };

  // 调用腾讯云 OCR API 进行识别
  client.RecognizeTableOCR(params).then(  
    (data) => {  
      console.log(data);  
      // 注意：确保返回给前端的是前端能够理解的格式，比如 JSON  
      res.json(data.to_json_string()); // 假设 data 有一个 to_json_string 方法，否则需要自行处理  
    },  
    (err) => {  
      console.error("error", err);  
      res.status(500).send("OCR failed");  
    }  
  );  
});  



// 创建 HTTP 服务器并监听端口
const server = app.listen(5500, () => {
  console.log("Server listening on port 5500"); // 输出服务器监听的端口号
});