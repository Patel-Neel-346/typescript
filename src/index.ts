import { BankService } from "./services/BankServices";

async function main() {
  const bank = new BankService();

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
}

main().catch((err) => console.error("Error:", err));
