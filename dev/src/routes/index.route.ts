import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import UrlController from '../controllers/url.controller';
import Route from '../interfaces/routes.interface';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();
  public urlController = new UrlController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}/test`, this.urlController.getUrl);
    this.router.post(`${this.path}/url`, this.urlController.addUrl);
    this.router.get(`${this.path}/:id`, this.urlController.getUrl);
  }
}

export default IndexRoute;
