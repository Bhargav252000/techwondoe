import Company from '../company/company.entity';
import { Column, Entity, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import User from '../user/user.entity';
import { FakeBaseEntity } from '../utils/base.entity';

@Entity()
class Team extends FakeBaseEntity {
  @Column()
  public teamLeadName: string;

  @ManyToMany(() => User, (user: User) => user.teams)
  @JoinTable({
    name: 'user_team',
  })
  public users: User[];

  @ManyToOne(() => Company, (company: Company) => company.teams)
  public company: Company;
}

export default Team;
