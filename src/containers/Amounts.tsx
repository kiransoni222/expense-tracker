import * as React from "react";
import { AmountContext } from "../context/AmountContext";
import { AmountContextType, IAmount } from "../@types/amount";
import Amount from "../components/Amount";

const Amounts = ({ onUpdate }) => {
  const { amounts, updateAmount } = React.useContext(
    AmountContext
  ) as AmountContextType;
  return (
    <>
      {amounts.map((amount: IAmount) => (
        <Amount key={amount.id} updateAmount={onUpdate} amount={amount} />
      ))}
    </>
  );
};

export default Amounts;
