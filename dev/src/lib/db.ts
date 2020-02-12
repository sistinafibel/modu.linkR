const mysql = require("mysql"); //mysql 묘듈
require('dotenv').config();

const pool  = mysql.createPool({
    connectionLimit : 20,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_TABLE_NAME,
    multipleStatements : true //다중쿼리 설정가능하도록
});

pool.on('connection', function (connection :any) {
    console.log('커넥트를 돌려줍니다. (다 씀)')
});

pool.on('enqueue', function () {
    console.log('모든 커넥트를 다 썼어요.');
});


export default pool;