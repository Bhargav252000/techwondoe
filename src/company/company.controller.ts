import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import CompanyService from './company.service';
import CreateCompanyDto from './dto/company.dto';
import authMiddleware from '../middleware/auth.middleware';
import customRequest from '../interfaces/request.interface';
import HttpException from '../exceptions/HttpException';

class CompanyController implements Controller {
  public path = '/company';
  public router = express.Router();

  public companyService = new CompanyService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, this.createCompany);
    this.router.get(`${this.path}/:companyid`, authMiddleware, this.getCompany);
    this.router.get(`${this.path}/:companyid/teams`, authMiddleware, this.getTeams);
    this.router.get(`${this.path}/:companyname/search`, authMiddleware, this.getCompanyByName);
  }

  /**
   * creates a new Company
   */
  private createCompany = async (request: customRequest, response: express.Response) => {
    const companyData: CreateCompanyDto = request.body;
    const owner = request.user.userName;

    try {
      const company = await this.companyService.createCompany(companyData, owner);
      response.send(company);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  /**
   * gets the details of the company
   */ 
  private getCompany = async (request: customRequest, response: express.Response, next: express.NextFunction) => {
    const { companyid } = request.params;

    try{
      const company = await this.companyService.getCompanyDetails(companyid);
      response.send(company);

    }catch(error) {
      next(new HttpException(error.message, error.statusCode));
    }
  }

  /**
   * gets all the teams of the company
   */ 
  private getTeams = async (request: customRequest, response: express.Response, next: express.NextFunction) => {
    const { companyid } = request.params;

    try{
      const teams = await this.companyService.getTeams(companyid);
      response.send(teams);

    }catch(error) {
      next(new HttpException(error.message, error.statusCode));
    }
  }

  /**
   * gets the company by name
   */
  private getCompanyByName = async (request: customRequest, response: express.Response, next: express.NextFunction) => {
    const { companyname } = request.params;

    try{
      const company = await this.companyService.getCompanyByName(companyname);
      response.send(company);

    }catch(error) {
      next(new HttpException(error.message, error.statusCode));
    }
  } 

}

export default CompanyController;
