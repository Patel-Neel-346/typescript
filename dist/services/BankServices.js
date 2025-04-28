"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = exports.AbstractBankService = void 0;
const Transaction_1 = require("../models/Transaction");
const CustomerErrors_1 = require("../errors/CustomerErrors");
const LoggerServices_1 = require("./LoggerServices");
class AbstractBankService {
}
exports.AbstractBankService = AbstractBankService;
class BankService extends AbstractBankService {
    constructor(logger = new LoggerServices_1.ConsoleLogger()) {
        super();
        this.accounts = new Map();
        this.transactions = [];
        this.idCounter = 1;
        this.logger = logger;
    }
    createAccount(name, initialDeposit) {
        const account = {
            id: this.idCounter++,
            name,
            balance: initialDeposit,
        };
        this.accounts.set(account.id, account);
        return account;
    }
    deposit(accountId, amount) {
        const account = this.getAccount(accountId);
        account.balance += amount;
        this.logTransaction({
            toAccountId: accountId,
            amount,
            type: Transaction_1.TransactionType.Deposit,
            date: new Date(),
        });
    }
    withdraw(accountId, amount) {
        const account = this.getAccount(accountId);
        if (account.balance < amount) {
            throw new CustomerErrors_1.InsufficientFundsError("Not enough balance.");
        }
        account.balance -= amount;
        this.logTransaction({
            fromAccountId: accountId,
            amount,
            type: Transaction_1.TransactionType.Withdraw,
            date: new Date(),
        });
    }
    transfer(fromId, toId, amount) {
        const fromAccount = this.getAccount(fromId);
        const toAccount = this.getAccount(toId);
        if (fromAccount.balance < amount) {
            throw new CustomerErrors_1.InsufficientFundsError("Not enough balance for transfer.");
        }
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        this.logTransaction({
            fromAccountId: fromId,
            toAccountId: toId,
            amount,
            type: Transaction_1.TransactionType.Transfer,
            date: new Date(),
        });
    }
    getAccount(id) {
        const account = this.accounts.get(id);
        if (!account) {
            throw new CustomerErrors_1.AccountNotFoundError(`Account with ID ${id} not found.`);
        }
        return account;
    }
    logTransaction(transaction) {
        this.transactions.push(transaction);
        this.logger.log(transaction);
    }
}
exports.BankService = BankService;
