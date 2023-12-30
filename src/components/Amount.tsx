import * as React from "react";
import { IAmount } from "../@types/amount";
import { Typography } from "@material-tailwind/react";

type Props = {
  amount: IAmount;
  updateAmount: (amount: IAmount) => void;
};

const Amount: React.FC<Props> = ({ amount, updateAmount }) => {
  return (
    <li
      className="flex items-center gap-4"
      onClick={() => updateAmount(amount)}
    >
      <Typography className="font-normal">{amount.description}</Typography>
      <Typography variant="h3" className="font-normal">
        {amount.amount}
      </Typography>
    </li>
  );
};
export default Amount;
