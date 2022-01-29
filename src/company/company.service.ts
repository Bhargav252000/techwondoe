import CompanyNotFoundException from '../exceptions/CompanyNotFoundException';
import { getRepository } from 'typeorm';
import CreateCompanyDto from './dto/company.dto';
import Company from './company.entity';
import Team from '../teams/teams.entity';

class CompanyService {
  private companyRepository = getRepository(Company);

  public async createCompany(companyData: CreateCompanyDto, owner: string): Promise<Company> {
    const company = this.companyRepository.create({
      ...companyData,
      companyCeo: owner,
    });

    await this.companyRepository.save(company);

    return company;
  }

  public async getCompanyDetails(companyid: string): Promise<Company> {
    const company = await this.companyRepository.findOne(companyid);

    if (!company) {
      throw new CompanyNotFoundException('Company not found');
    }

    return company;
  }

  public async getTeams(companyid: string): Promise<Company[]> {
    const teams = await this.companyRepository
      .createQueryBuilder('company')
      .where('company.id = :id', { id: companyid })
      .leftJoinAndSelect('company.teams', 'teams')
      .getMany();

    return teams;
  }

  // public async getCompanyByName(companyName: string) {
  //   const company = await this.companyRepository
  //     .createQueryBuilder('company')
  //     .where('company.companyName = :companyName', { companyName })
  //     .getOne();

  //   if (!company) {
  //     throw new CompanyNotFoundException('Company not found');
  //   }

  //   return company;
  // }

  public async getCompanyByName(companyName: string): Promise<Company[]> {
    
    const formattedCompanyName = companyName.trim().replace(/ /g, ' & ');
    
    const company = await this.companyRepository
      .createQueryBuilder('company')
      .where(
        `to_tsvector('english', company.companyName) @@ to_tsquery('english', :companyName)`,
        { companyName: `${formattedCompanyName}:*` },
      ).getMany();
      

    return company;
  }
}

export default CompanyService;
