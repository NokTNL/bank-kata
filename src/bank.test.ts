import { Bank } from "./bank";

describe("Acceptance test", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test("Should print correct statement", () => {
    const spyConsoleLog = jest.spyOn(console, "log");
    const bank = new Bank([]);

    jest.useFakeTimers();
    jest.setSystemTime(new Date("2012-01-10"));
    bank.deposit(1000);
    jest.setSystemTime(new Date("2012-01-13"));
    bank.deposit(2000);
    jest.setSystemTime(new Date("2012-01-14"));
    bank.withdraw(500);

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
});
