const express = require('express');
const router = express.Router();
const commons = require(__base+'routes/lib/commons');
const mainDao = require(__base+'routes/main/impl/mainDao'); //mainDao

require('dotenv').config();


/**
 * GET
 * 메인페이지
 */
router.get('/', function(req, res, next) {
    res.render('index' , {serviceUrl : process.env.SERVER_URL});   
});

/**
 * GET
 * 축소URL -> 할당된 URL로 이동
 * 축소된 파라미터로 다른 페이지로 리다이렉트 시킵니다.
 */
router.get('/:url', async function(req, res, next) {
    sqlArray = [ encodeURI(req.params.url) ];
    let getUrlInf =  await mainDao.getUrlInf(sqlArray);

    if(commons.isEmpty(getUrlInf)){
        res.render('black');
        return 0;
    }
    console.log(getUrlInf);
    console.log(getUrlInf[0].url);
    res.statusCode = 302;
    res.setHeader('Location', getUrlInf[0].url);
    res.end();
});

/**
 * POST
 * 단축 URL을 생성합니다.
 */
router.post('/addUrlGeneration', async function(req, res, next) {

    let userUrl = encodeURI(req.body.userUrl);
    let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    if(!regex.test(userUrl)){
        resJson("600" , "URL주소가 아닙니다.");
    }

    let sqlValue = {};


    /* 
    
    한번 등록한 URL은 사용하지 않게 하려고 했으나, 이용자마다 통계 기능을 위해 주석처리.
    let sqlArray = [];
    sqlArray = [ req.body.userUrl, req.body.sslSet];
    let urlCheck =  await mainDao.getUrlCheck(sqlArray);
    if(!commons.isEmpty(urlCheck)){
        resJson("600" , "이미 등록된 URL 주소입니다.");
    }
    */

    //이용자 아이피 정보 받아오기
    const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;

    let retrun_url = makeid();

    sqlValue = {
        url : userUrl,
        urltype : req.body.sslSet,
        return_url : retrun_url,
        domain : req.body.domainSet,
        etcset : req.body.etcSet
    };

    console.log(sqlValue);

    let urlInf = await mainDao.addUrlInf(sqlValue);
    console.log("------------------------------");

    let jsonRrturn = {
        status : "200",
        text : "정상적으로 생성되었습니다.",
        url : userUrl,
        urltype : req.body.sslSet,
        return_url : retrun_url,
        domain : req.body.domainSet,
        etcset : req.body.etcSet,
        serviceUrl : process.env.SERVER_URL
    }

    res.json(jsonRrturn);
});

/**
 * res JSON 전용으로 오류 메세지용도로 공통화 처리
 * @param {*} statusCode 
 * @param {*} text 
 * 
 */
function resJson(statusCode , text){
    let jsonRrturn = {
        status : statusCode,
        text : text
    }
    res.json(jsonRrturn);
    return 0;
}

/**
 * 7자리의 랜덤 String값을 전달합니다.
 */
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}



module.exports = router;