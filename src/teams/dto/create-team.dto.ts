import { IsString } from 'class-validator';

class CreateTeamDto {
  @IsString()
  public teamName: string;
}

export default CreateTeamDto;
