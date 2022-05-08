export interface IExpense {
  id?: number;
  title: string;
  amount: number;
  date: string;
  category: number;
  description?: string;
  isExpense?: boolean;
  isIncome?: boolean;
  isTransfer?: boolean;
}

export interface IExpenseErrors {
  title?: string;
  amount?: string;
}
