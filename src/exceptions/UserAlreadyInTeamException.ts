import HttpException from './HttpException';

class UserAlreadyInTeamException extends HttpException {
  constructor(userid: string, teamid: string) {
    super(404, `User with id ${userid} already in team with id ${teamid}`);
  }
}

export default UserAlreadyInTeamException;
