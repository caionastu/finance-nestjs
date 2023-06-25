import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entity/transaction.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private service: TransactionService) {}
  @Get()
  @ApiOkResponse({
    description: 'Return all transactions',
    type: Transaction,
    isArray: true,
  })
  findAll(): Promise<Transaction[]> {
    return this.service.findAll();
  }
  @Get('account/:id')
  @ApiOkResponse({
    description: 'Transactions found by account id',
    type: Transaction,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'The id must be in uuid format' })
  findAllByAccount(
    @Param('id', ParseUUIDPipe) accountId: string,
  ): Promise<Transaction[]> {
    return this.service.findAllByAccountId(accountId);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Transaction found by id',
    type: Transaction,
  })
  @ApiBadRequestResponse({ description: 'The id must be in uuid format' })
  @ApiNotFoundResponse({ description: 'Transaction not found by id' })
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Transaction> {
    return this.service.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Transaction created', type: Transaction })
  @ApiBadRequestResponse({
    description: `Request body doesn't meet the requirements`,
  })
  @ApiNotFoundResponse({ description: 'Account not found by account id' })
  create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.service.create(createTransactionDto);
  }
  @Post(':id')
  @ApiOkResponse({ description: 'Transaction updated', type: Transaction })
  @ApiNotFoundResponse({ description: 'Transaction not found by id' })
  @ApiBadRequestResponse({
    description: `Request body doesn't meet the requirements`,
  })
  update(@Param('id') id: string): Promise<Transaction> {
    return this.service.update(id, 'test');
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Transaction deleted' })
  @ApiNotFoundResponse({
    description:
      'Transaction not found by id or account not found by account id',
  })
  @ApiBadRequestResponse({ description: 'The id must be in uuid format' })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.service.delete(id);
  }
}
