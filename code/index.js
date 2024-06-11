const { pool, executeQuery } = require('./dbconfig')
const express = require('express')
const app = express()
 
app.get('/get', async (req, res) => {
  try {
    const sql = `SELECT * FROM 设备信息表;`//sql语句 搜索test表所有数据
    const result = await executeQuery(sql)//执行sql语句
 
    res.send({
      result,
      code: 200,
    })
  } catch (error) {
    console.error('Error executing query:', error)
    res.status(500).send('Internal Server Error')
  }
})
 
app.listen('5500', () => {
  console.log(`node服务已启动 端口号是：5500`)
})