"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BankServices_1 = require("./services/BankServices");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const bank = new BankServices_1.BankService();
        const Neel = bank.createAccount("Neel", 500);
        const Jay = bank.createAccount("Jay", 300);
        const Ram = bank.createAccount("Ram", 800);
        console.log("\nInitial Accounts:");
        console.log(bank.getAccount(Neel.id));
        console.log(bank.getAccount(Jay.id));
        console.log(bank.getAccount(Ram.id));
        bank.deposit(Neel.id, 200);
        bank.withdraw(Jay.id, 100);
        bank.withdraw(Ram.id, 400);
        bank.transfer(Neel.id, Jay.id, 150);
        bank.transfer(Ram.id, Neel.id, 200);
        console.log("\nAccounts After Transactions:");
        console.log(bank.getAccount(Neel.id));
        console.log(bank.getAccount(Jay.id));
        console.log(bank.getAccount(Ram.id));
    });
}
main().catch((err) => console.error("Error:", err));
