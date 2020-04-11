import { NextFunction, Request, Response } from 'express';

class IndexController {

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render('index' , {serviceUrl : process.env.SERVER_URL});
    } catch (error) {
      next(error);
    }
  }
}

export default IndexController;
