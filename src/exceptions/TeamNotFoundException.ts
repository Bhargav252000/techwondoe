import HttpException from './HttpException';

class TeamNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Team with id ${id} not found`);
  }
}

export default TeamNotFoundException;
