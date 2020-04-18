import { NextFunction, Request, Response } from 'express';
import urlService from '../services/url.service';
import { randomId , isEmpty } from '../utils/util';

class UrlController {
    public urlService = new urlService();

    public getUrl = async (req: Request, res: Response, next: NextFunction) => {
        console.log("tsetetset");
        try {
            let sqlArray = encodeURI(req.params.url);
            let getUrlInf = await this.urlService.getUrlInf(sqlArray);

            if(isEmpty(getUrlInf)){
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
        } catch (error) {
            next(error);
        }
    }

    public addUrl = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let userUrl = encodeURI(req.body.url);
            let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
            if(!regex.test(userUrl)){   
                let jsonRrturn = {
                    status : 600,
                    text : "잘못된 도메인입니다."
                }
                res.json(jsonRrturn);
                return 0;
            }

            const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
            let retrun_url = randomId();

            console.log(retrun_url);
            let getUrlInf = await this.urlService.addUrl(userUrl);

        } catch (error){
            next(error);
        }
    }
}

export default UrlController;
