let pool = require(__base+'routes/lib/db');
let mainDao = {};


mainDao.getUrlInf = function(param){
    return new Promise(function (resolve, reject){
        let sql = "SELECT * FROM urllist WHERE 1=1 AND return_url = ?";
        let sqlValue = param;

        console.log(param);

        pool.getConnection(function(err, connection) {
            try{
                connection.query(sql, sqlValue, function(err, result, fields) {
                    if (err) {
                        console.log(err);
                        reject(err.code);
                    } else {
                        console.log(result);
                        resolve (result);
                    }
                });
            }catch(e){
                console.log(e);
            }finally{
                connection.release();
            }
           
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
            try{
                connection.query(sql, sqlValue, function(err, result, fields) {
                    if (err) {
                        console.log(err);
                        reject(err.code);
                    } else {
                        console.log(result);
                        resolve (result);
                    }
                });
            }catch(e){
                console.log(e);
            }finally{
                connection.release();
            }
           
        });

    });
    
};


//새로운 URL 정보 추가
mainDao.addUrlInf = function(param){
    return new Promise(function (resolve, reject){    
        let sql = "INSERT INTO urllist SET ? ";
        let sqlValue = param;
       
        pool.getConnection(function(err, connection) {
            try{
                connection.query(sql, sqlValue, function(err, result, fields) {
                    console.log("--------------------------------------");
                    if (err) {
                        console.log(err);
                        reject(err.code);
                    } else {
                        resolve(result); // 콜백 시작
                    }
                })
            }catch (e){
                console.log(e);
            }finally{
                connection.release();
            }
        });
    });
}




module.exports = mainDao;


