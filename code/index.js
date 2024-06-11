const { pool, executeQuery } = require('./dbconfig');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/input', async (req, res) => {
  try {
    const { 产品编号, 产品名称, 制造商, 生产日期, 送检日期, 设备产地 } = req.body;
    const sql = `INSERT INTO 设备信息表 (产品编号, 产品名称, 制造商, 生产日期, 送检日期, 设备产地) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [产品编号, 产品名称, 制造商, 生产日期, 送检日期, 设备产地];
    const result = await executeQuery(sql, values);

    res.send({
      result,
      code: 200,
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(5500, () => {
  console.log('Node服务已启动，端口号是：5500');
});
