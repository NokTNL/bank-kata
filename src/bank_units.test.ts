import * as bank from "./bank";

describe("Unit tests", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test("printStatement prints whatever the transaction records is", () => {
    const spyConsoleLog = jest.spyOn(console, "log");
    const mockListOfTx: bank.TransactionType[] = [
      {
        date: new Date("2012-01-14"),
        amount: -500,
        balance: 2500,
      },
      {
        date: new Date("2012-01-13"),
        amount: 2000,
        balance: 3000,
      },
      {
        date: new Date("2012-01-10"),
        amount: 1000,
        balance: 1000,
      },
    ];

    bank.init(mockListOfTx);
    bank.printStatement();
    expect(spyConsoleLog).toHaveBeenCalledWith(
      [
        "Date       || Amount || Balance",
        "14/01/2012 || -500   || 2500",
        "13/01/2012 || 2000   || 3000",
        "10/01/2012 || 1000   || 1000",
      ].join("\n")
    );
  });
  test("Deposit should add new record", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2012-01-10"));

    const mockListOfTx = [] as bank.TransactionType[];
    bank.init(mockListOfTx);

    bank.deposit(1000);

    expect(mockListOfTx).toEqual([
      {
        date: new Date("2012-01-10"),
        amount: 1000,
        balance: 1000,
      },
    ]);
  });
  test("Withdraw should add new record", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2012-01-14"));

    const mockListOfTx = [] as bank.TransactionType[];
    bank.init(mockListOfTx);

    bank.withdraw(500);

    expect(mockListOfTx).toEqual([
      {
        date: new Date("2012-01-14"),
        amount: -500,
        balance: -500,
      },
    ]);
  });
});