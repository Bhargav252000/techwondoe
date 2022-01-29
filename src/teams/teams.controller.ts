import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import TeamsService from './teams.service';
import authMiddleware from '../middleware/auth.middleware';
import customRequest from '../interfaces/request.interface';
import HttpException from '../exceptions/HttpException';

class TeamsController implements Controller {
  public path = '/teams';
  public router = express.Router();
  private teamsService = new TeamsService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:companyid/`, authMiddleware, this.createTeam);
    this.router.post(`${this.path}/:companyid/:teamid/`, authMiddleware, this.addUserToTeam);
    this.router.get(`${this.path}/:teamid/`, authMiddleware, this.getTeam);
  }

  /**
   * creates a new team
   */
  private createTeam = async (request: customRequest, response: express.Response, next: express.NextFunction) => {
    try {
      const team = await this.teamsService.createTeam(request);
      response.send(team);
    } catch (error) {
      next(new HttpException(error.message, error.statusCode));
    }
  };

  /**
   * add a user to the team
   */ 
  private addUserToTeam = async (request: customRequest, response: express.Response, next: express.NextFunction) => {
    try {
      const team = await this.teamsService.addUserToTeam(request);
      response.send(team);
    } catch (error) {
      next(new HttpException(error.message, error.statusCode));
    }
  }

  private getTeam = async (request: customRequest, response: express.Response, next: express.NextFunction) => {
    try {
      const team = await this.teamsService.getTeam(request);
      response.send(team);
    } catch (error) {
      next(new HttpException(error.message, error.statusCode));
    }
  }
}

export default TeamsController;
