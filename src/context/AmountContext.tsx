import * as React from "react";
import { AmountContextType, IAmount } from "../@types/amount";

export const AmountContext = React.createContext<AmountContextType | null>(
  null
);

const AmountProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [amounts, setAmounts] = React.useState<IAmount[]>([]);

  const saveAmount = (amount: IAmount) => {
    const newAmount: IAmount = {
      id: Math.random(),
      totalAmount: amount.totalAmount,
      totalExpense: amount.totalExpense,
      amount: amount.amount,
      description: amount.description,
      isBalancedAmount: amount.isBalancedAmount,
    };
    setAmounts([...amounts, newAmount]);
  };

  const updateAmount = (id: number) => {
    amounts.filter((amount: IAmount) => {
      if (amount.id === id) {
        setAmounts([...amounts]);
      }
    });
  };

  return (
    <AmountContext.Provider value={{ amounts, saveAmount, updateAmount }}>
      {children}
    </AmountContext.Provider>
  );
};
export default AmountProvider;
