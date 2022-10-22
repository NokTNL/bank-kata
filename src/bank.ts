export type TransactionType = {
  date: Date;
  amount: number;
  balance: number;
};

let _listOfTx = [] as TransactionType[];
let _balance = 0;

// Imitating a constructor fucntion so that we can mock the transaction list
export const init = (initialListOfTx: TransactionType[]) => {
  _listOfTx = initialListOfTx;
  _balance = 0;
};

export const deposit = (amount: number) => {
  _balance += amount;

  _listOfTx.unshift({
    date: new Date(),
    amount: amount,
    balance: _balance,
  });
};
export const withdraw = (amount: number) => {
  _balance -= amount;

  _listOfTx.unshift({
    date: new Date(),
    amount: -amount,
    balance: _balance,
  });
};

export const printStatement = () => {
  const formatDateString = (date: Date) =>
    `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;

  console.log(
    "Date       || Amount || Balance\n" +
      _listOfTx
        .map(
          (tx) =>
            `${formatDateString(tx.date)} || ${tx.amount}   || ${tx.balance}`
        )
        .join("\n")
  );
};
