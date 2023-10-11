export class StatisticsService {
    constructor(transactions) {
        this.transactions = transactions;

        this.currentDate = new Date();
        this.firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        this.lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        this.firstHourOfDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 0, 0, 0);
        this.lastHourOfDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 1, 0, 0, 0);
    }

    calculateTotal(isProfit) {
        return this.transactions.reduce((total, transaction) => total + (transaction.type === isProfit ? transaction.price : 0), 0);
    }

    filterTransactions(startDate, endDate, isProfit) {
        return this.transactions.filter(transaction =>
            transaction.createdAt >= startDate &&
            transaction.createdAt <= endDate &&
            transaction.type === isProfit
        );
    }

    calculateTotalByType(filteredTransactions) {
        return filteredTransactions.reduce((total, transaction) => total + transaction.price, 0);
    }

    calculateProfit() {
        const totalProfitAll = this.calculateTotal(true);
        const expensesMonth = this.calculateTotalByType(this.filterTransactions(this.firstDayOfMonth, this.lastDayOfMonth, false));
        const profitDay = this.calculateTotalByType(this.filterTransactions(this.firstHourOfDay, this.lastHourOfDay, true)) - expensesMonth;
        const profitMonth = totalProfitAll - expensesMonth;

        return { all: totalProfitAll - expensesMonth, day: profitDay, month: profitMonth };
    }

    calculateExpenses() {
        const totalExpensesAll = this.calculateTotal(false);
        const expensesDay = this.calculateTotalByType(this.filterTransactions(this.firstHourOfDay, this.lastHourOfDay, false));
        const expensesMonth = totalExpensesAll;

        return { all: totalExpensesAll, day: expensesDay, month: expensesMonth };
    }

    get() {
        const profitInfo = this.calculateProfit();
        const expensesInfo = this.calculateExpenses();

        return { profit: profitInfo, expenses: expensesInfo };
    }
}