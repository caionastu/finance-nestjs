import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'Account name should not be empty.' })
  name: string;
  @IsNotEmpty({ message: 'Balance should not be empty' })
  balance: number;
  number?: number;
  branch?: number;
  bankCode?: number;
}
