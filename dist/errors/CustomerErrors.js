"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountNotFoundError = exports.InsufficientFundsError = void 0;
class InsufficientFundsError extends Error {
    constructor(message) {
        super(message);
        this.name = "InsufficientFundsError";
    }
}
exports.InsufficientFundsError = InsufficientFundsError;
class AccountNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "AccountNotFoundError";
    }
}
exports.AccountNotFoundError = AccountNotFoundError;
