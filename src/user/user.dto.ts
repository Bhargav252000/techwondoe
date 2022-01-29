import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public userName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

export default CreateUserDto;
