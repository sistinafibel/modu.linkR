import { NextFunction, Request, Response } from 'express';
import urlService from '../services/url.service';
import { randomId , isEmpty } from '../utils/util';

class UrlController {
    public urlService = new urlService();

    public url = async (req: Request, res: Response, next: NextFunction) => {
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
}

export default UrlController;
