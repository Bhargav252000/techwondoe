import { Column, Entity, OneToMany, Index } from 'typeorm';
import { FakeBaseEntity } from '../utils/base.entity';
import Team from '../teams/teams.entity';
import User from '../user/user.entity';

@Entity()
class Company extends FakeBaseEntity {

  @Index("company_name_index", { unique: true })
  @Column({ name: 'company_name' })
  public companyName: string;

  @Column({ name: 'company_address' })
  public companyAddress: string;

  @Column({ name: 'company_ceo' })
  public companyCeo: string;

  @OneToMany(() => Team, (team: Team) => team.company)
  public teams: Team[];
}

export default Company;
