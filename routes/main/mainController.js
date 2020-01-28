const commons = require(__base+'routes/lib/commons');
const mainDao = require(__base+'routes/main/impl/mainDao'); //mainDao
const QRCode = require('qrcode');


require('dotenv').config();


/**
 * GET
 * 메인페이지
 */

let main = {};

main.index = (req,res,next) => {
    res.render('index' , {serviceUrl : process.env.SERVER_URL});   
};

main.test = async (req,res,next) => {
    res.render('time' , {serviceUrl : "https://naver.com"});
};

main.image = async (req, res) => {
    let userUrl = `https://${process.env.SERVER_URL}/` + encodeURI(req.params.url);
    QRCode.toDataURL(userUrl, (err, url) => {
        const data = url.replace(/.*,/, "");
        const img = new Buffer(data, "base64");
  
        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": img.length
        });
  
        res.end(img);
    });
};



/**
 * GET
 * 축소URL -> 할당된 URL로 이동
 * 축소된 파라미터로 다른 페이지로 리다이렉트 시킵니다.
 */
main.url = async (req,res,next)  => {
    sqlArray = [ encodeURI(req.params.url) ];

    try {
        let getUrlInf = await mainDao.getUrlInf(sqlArray);
        if(commons.isEmpty(getUrlInf)){
            res.render('black');
            return;
        }
        console.log(getUrlInf[0].etcset);
        console.log(getUrlInf);
        if(Number(getUrlInf[0].etcset) == 2){
            res.render('time' , {serviceUrl : getUrlInf[0].url});
            return;
        }
        res.statusCode = 302;
        res.setHeader('Location', getUrlInf[0].url);
        res.end();
    }catch (error) {
        next(error);
    }
};



/**
 * POST
 * 단축 URL을 생성합니다.
 */
main.addUrlGeneration = async (req,res,next)  => {
    let userUrl = encodeURI(req.body.userUrl);
    let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    if(!regex.test(userUrl)){
        let jsonRrturn = {
            status : 600,
            text : "잘못된 도메인입니다."
        }
        res.json(jsonRrturn);
        return 0;
    }

    let sqlValue = {};

    try {
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
        let retrun_url = commons.randomId();

        sqlValue = {
            url : userUrl,
            urltype : req.body.sslSet,
            return_url : retrun_url,
            domain : req.body.domainSet,
            etcset : req.body.etcSet
        };

        await mainDao.addUrlInf(sqlValue);

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
    }catch (error) {
        next(error);
    }
};
module.exports = main;