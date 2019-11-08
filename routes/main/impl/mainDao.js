let pool = require(__base+'routes/lib/db');
const domain = require('domain');
let mainDao = {};

mainDao.getUrlInf = function(param){
    return new Promise(function (resolve, reject){
        let sql = "SELECT * FROM urllist WHERE 1=1 AND return_url = ?";
        let sqlValue = param;
        
        pool.getConnection(function(err, connection) {
            connection.query(sql, sqlValue, function(err, result) {
                if (err) { reject(new Error(err));} 
                else {
                    resolve (result);
                }
            });
            connection.release();
        });

    });
};



//정상 등록된건지 확인합니다.
mainDao.getUrlCheck = function(param){
    return new Promise(function (resolve, reject){
        let sql = "SELECT * FROM urllist WHERE 1=1 AND url = ? AND urltype = ?";
        let sqlValue = param;

        console.log(param);

        pool.getConnection(function(err, connection) {
            connection.query(sql, sqlValue, function(err, result) {
                if (err) { reject(new Error(err));} 
                else {
                    resolve (result);
                }
            });
            connection.release();
        });

    });
    
};


//새로운 URL 정보 추가
mainDao.addUrlInf = function(param){
    return new Promise(function (resolve, reject){    
        let sql = "INSERT INTO urllist SET ? ";
        let sqlValue = param;
       
        pool.getConnection(function(err, connection) {
            connection.query(sql, sqlValue, function(err, result) {
                if (err) { reject(new Error(err));} 
                else {
                    resolve (result);
                }
            });
            connection.release();
        });
    });
}


module.exports = mainDao;


