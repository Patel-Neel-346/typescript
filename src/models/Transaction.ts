export enum TransactionType {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Transfer = "Transfer",
}

export interface Transaction {
  fromAccountId?: number;
  toAccountId?: number;
  amount: number;
  type: TransactionType;
  date: Date;
}
