"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = exports.AbstractBankService = void 0;
var Transaction_1 = require("../models/Transaction");
var CustomerErrors_1 = require("../errors/CustomerErrors");
var LoggerServices_1 = require("./LoggerServices");
var AbstractBankService = /** @class */ (function () {
    function AbstractBankService() {
    }
    return AbstractBankService;
}());
exports.AbstractBankService = AbstractBankService;
var BankService = /** @class */ (function (_super) {
    __extends(BankService, _super);
    function BankService(logger) {
        if (logger === void 0) { logger = new LoggerServices_1.ConsoleLogger(); }
        var _this = _super.call(this) || this;
        _this.accounts = new Map();
        _this.transactions = [];
        _this.idCounter = 1;
        _this.logger = logger;
        return _this;
    }
    BankService.prototype.createAccount = function (name, initialDeposit) {
        var account = {
            id: this.idCounter++,
            name: name,
            balance: initialDeposit,
        };
        this.accounts.set(account.id, account);
        return account;
    };
    BankService.prototype.deposit = function (accountId, amount) {
        var account = this.getAccount(accountId);
        account.balance += amount;
        this.logTransaction({
            toAccountId: accountId,
            amount: amount,
            type: Transaction_1.TransactionType.Deposit,
            date: new Date(),
        });
    };
    BankService.prototype.withdraw = function (accountId, amount) {
        var account = this.getAccount(accountId);
        if (account.balance < amount) {
            throw new CustomerErrors_1.InsufficientFundsError("Not enough balance.");
        }
        account.balance -= amount;
        this.logTransaction({
            fromAccountId: accountId,
            amount: amount,
            type: Transaction_1.TransactionType.Withdraw,
            date: new Date(),
        });
    };
    BankService.prototype.transfer = function (fromId, toId, amount) {
        var fromAccount = this.getAccount(fromId);
        var toAccount = this.getAccount(toId);
        if (fromAccount.balance < amount) {
            throw new CustomerErrors_1.InsufficientFundsError("Not enough balance for transfer.");
        }
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        this.logTransaction({
            fromAccountId: fromId,
            toAccountId: toId,
            amount: amount,
            type: Transaction_1.TransactionType.Transfer,
            date: new Date(),
        });
    };
    BankService.prototype.getAccount = function (id) {
        var account = this.accounts.get(id);
        if (!account) {
            throw new CustomerErrors_1.AccountNotFoundError("Account with ID ".concat(id, " not found."));
        }
        return account;
    };
    BankService.prototype.logTransaction = function (transaction) {
        this.transactions.push(transaction);
        this.logger.log(transaction);
    };
    return BankService;
}(AbstractBankService));
exports.BankService = BankService;
