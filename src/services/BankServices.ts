import { Account } from "../models/Account";
import { Transaction, TransactionType } from "../models/Transaction";
import {
  InsufficientFundsError,
  AccountNotFoundError,
} from "../errors/CustomerErrors";
import { Logger, ConsoleLogger } from "./LoggerServices";

export abstract class AbstractBankService {
  abstract createAccount(name: string, initialDeposit: number): Account;
  abstract deposit(accountId: number, amount: number): void;
  abstract withdraw(accountId: number, amount: number): void;
  abstract transfer(fromId: number, toId: number, amount: number): void;
  abstract getAccount(id: number): Account;
}

export class BankService extends AbstractBankService {
  private accounts: Map<number, Account> = new Map();
  private transactions: Transaction[] = [];
  private logger: Logger<Transaction>;
  private idCounter: number = 1;

  constructor(logger: Logger<Transaction> = new ConsoleLogger<Transaction>()) {
    super();
    this.logger = logger;
  }

  createAccount(name: string, initialDeposit: number): Account {
    const account: Account = {
      id: this.idCounter++,
      name,
      balance: initialDeposit,
    };
    this.accounts.set(account.id, account);
    return account;
  }

  deposit(accountId: number, amount: number): void {
    const account = this.getAccount(accountId);
    account.balance += amount;
    this.logTransaction({
      toAccountId: accountId,
      amount,
      type: TransactionType.Deposit,
      date: new Date(),
    });
  }

  withdraw(accountId: number, amount: number): void {
    const account = this.getAccount(accountId);
    if (account.balance < amount) {
      throw new InsufficientFundsError("Not enough balance.");
    }
    account.balance -= amount;
    this.logTransaction({
      fromAccountId: accountId,
      amount,
      type: TransactionType.Withdraw,
      date: new Date(),
    });
  }

  transfer(fromId: number, toId: number, amount: number): void {
    const fromAccount = this.getAccount(fromId);
    const toAccount = this.getAccount(toId);
    if (fromAccount.balance < amount) {
      throw new InsufficientFundsError("Not enough balance for transfer.");
    }
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    this.logTransaction({
      fromAccountId: fromId,
      toAccountId: toId,
      amount,
      type: TransactionType.Transfer,
      date: new Date(),
    });
  }

  getAccount(id: number): Account {
    const account = this.accounts.get(id);
    if (!account) {
      throw new AccountNotFoundError(`Account with ID ${id} not found.`);
    }
    return account;
  }

  private logTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
    this.logger.log(transaction);
  }
}
