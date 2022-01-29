import { getRepository } from 'typeorm';
import CreateTeamDto from './dto/create-team.dto';
import customRequest from '../interfaces/request.interface';
import Company from '../company/company.entity';
import Team from '../teams/teams.entity';
import User from '../user/user.entity';
import CompanyNotFoundException from '../exceptions/CompanyNotFoundException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import TeamNotFoundException from '../exceptions/TeamNotFoundException';

class TeamsService {
  private teamRepository = getRepository(Team);
  private companyRepository = getRepository(Company);
  private userRepository = getRepository(User);

  /**
   * creates a new team
   * @param {Object} request
   */
  public async createTeam(data: customRequest) {
    const { companyid } = data.params;
    const teamData: CreateTeamDto = data.body;
    const teamLead: string = data.user.userName;

    const company = await this.companyRepository.findOne(companyid);

    if (!company) {
      throw new CompanyNotFoundException(companyid);
    }

    const team = this.teamRepository.create({
      ...teamData,
      teamLeadName: teamLead,
      company,
    });

    await this.teamRepository.save(team);

    return team;
  }

  public async addUserToTeam(data: customRequest) {
    const { companyid, teamid } = data.params;
    const { userId } = data.body;

    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new WrongCredentialsException();
    }

    const team = await this.teamRepository.findOne({
      where: {
        id: teamid,
        company: { id: companyid },
      },
    });
    // console.log('team ', team);
    // console.log('user ', user);

    if (!team) {
      throw new CompanyNotFoundException(companyid);
    }

    // check if that user is present in that team
    // const userInTeam = await this.teamRepository
    //   .createQueryBuilder('team')
    //   .leftJoinAndSelect('team.users', 'users')
    //   .where('team.id = :teamid', { teamid })
    //   .andWhere('team.users.id = :userId', { userId })
    //   .getOne();
    const userInTeam = await this.teamRepository
      .createQueryBuilder('team')
      .innerJoin('team.users', 'teamUsers', 'teamUsers.id IN (:...userIds)', { userIds: [userId] });

    console.log('userInTeam ', userInTeam);

    if (userInTeam) {
      throw new Error('User already in team');
    }

    const res = await this.teamRepository
      .createQueryBuilder()
      .relation(Team, 'users')
      .of(team)
      .add(user);

    return res;
  }

  public async getTeam(data: customRequest) {
    const { teamid } = data.params;

    const team = await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.users', 'users')
      .where('team.id = :teamid', { teamid })
      .select([
        'team.id',
        'team.createdAt',
        'team.teamLeadName',
        'users.id',
        'users.userName',
        'users.email',
        'users.createdAt',
      ])
      .getMany();

    if (!team) {
      throw new TeamNotFoundException(teamid);
    }

    return team;
  }
}

export default TeamsService;
