import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entity/transaction.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from '../accounts/account.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
    private accountService: AccountService,
    private datasource: DataSource,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.repository.find();
  }

  findAllByAccountId(accountId: string): Promise<Transaction[]> {
    return this.repository.findBy({ accountId: accountId });
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.repository.findOneBy({ id: id });
    if (transaction == null) {
      throw new NotFoundException(`Transaction not found with id ${id}.`);
    }

    return transaction;
  }

  // TODO this should be transactional
  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = Transaction.from(createTransactionDto);
    await this.accountService.add(transaction);
    await this.repository.save(transaction);
    return transaction;
  }

  // TODO add category to be changed and add in request body
  async update(id: string, description: string): Promise<Transaction> {
    const transaction = await this.findById(id);
    transaction.description = description;
    return this.repository.save(transaction);
  }

  // TODO this should be transactional
  async delete(id: string): Promise<void> {
    try {
      const transaction = await this.findById(id);
      await this.accountService.remove(transaction);
      await this.repository.delete(transaction);
    } catch (exception) {
      const isNotFoundException = exception instanceof NotFoundException;
      if (!isNotFoundException) {
        return exception;
      }
    }
  }
}
