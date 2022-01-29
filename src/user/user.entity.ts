import Team from '../teams/teams.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { FakeBaseEntity } from '../utils/base.entity';

@Entity()
class User extends FakeBaseEntity {
  @Column()
  public userName: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @ManyToMany(() => Team, (team: Team) => team.users)
  public teams: Team[];
}

export default User;
