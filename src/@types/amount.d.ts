export interface IAmount {
  id: number;
  totalAmount: number;
  totalExpense: number;
  amount: number;
  description: string;
  isBalancedAmount: boolean;
}
export type AmountContextType = {
  amounts: IAmount[];
  saveAmount: (amount: IAmount) => void;
  updateAmount: (id: number) => void;
};
