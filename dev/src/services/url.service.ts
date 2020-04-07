import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import pool from '../lib/db';

class UrlService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = this.users;
    return users;
  }

  public async getUrlInf(param: string): Promise<any> {
   
    let sql = "SELECT url, return_url, etcset FROM urllist WHERE 1=1 AND return_url = ?";
    let sqlValue = param;
    
    pool.getConnection(function(err : any, connection : any) {
        if (err) {return (new Error(err));}
        connection.query(sql, [sqlValue], function(err : any , result :any) {
            if (err) { return(new Error(err));} 
            else {
                return result;
            }
        });
        connection.release();
    });
  }
}

export default UrlService;
