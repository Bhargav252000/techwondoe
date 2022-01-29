import { IsString } from 'class-validator';

class CreateCompanyDto {
  @IsString()
  public companyName: string;

  @IsString()
  public companyAddress: string;
}

export default CreateCompanyDto;
