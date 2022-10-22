export type TransactionType = {
  date: Date;
  amount: number;
  balance: number;
};

export class Bank {
  private _listOfTx: TransactionType[];
  private _balance: number = 0;

  constructor(initialListOfTx: TransactionType[]) {
    this._listOfTx = initialListOfTx;
  }

  deposit(amount: number) {
    this._balance += amount;

    this._listOfTx.unshift({
      date: new Date(),
      amount: amount,
      balance: this._balance,
    });
  }

  withdraw(amount: number) {
    this._balance -= amount;

    this._listOfTx.unshift({
      date: new Date(),
      amount: -amount,
      balance: this._balance,
    });
  }

  printStatement = () => {
    const formatDateString = (date: Date) =>
      `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;

    console.log(
      "Date       || Amount || Balance\n" +
        this._listOfTx
          .map(
            (tx) =>
              `${formatDateString(tx.date)} || ${tx.amount}   || ${tx.balance}`
          )
          .join("\n")
    );
  };
}
