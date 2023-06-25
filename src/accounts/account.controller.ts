import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountsService: AccountService) {}

  @Get()
  @ApiOkResponse({
    description: 'Return all accounts',
    type: Account,
    isArray: true,
  })
  findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Account found by id', type: Account })
  @ApiNotFoundResponse({ description: 'Account not found by id' })
  @ApiBadRequestResponse({ description: 'The id must be in uuid format' })
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Account> {
    return this.accountsService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Account created', type: Account })
  @ApiBadRequestResponse({
    description: `Request body doesn't meet the requirements`,
  })
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.create(createAccountDto);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Account updated', type: Account })
  @ApiNotFoundResponse({ description: 'Account not found by id' })
  @ApiBadRequestResponse({
    description: `Request body doesn't meet the requirements`,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Account deleted' })
  @ApiUnprocessableEntityResponse({
    description:
      'Cannot delete account, because it has transactions attached to id',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.accountsService.delete(id);
  }
}
