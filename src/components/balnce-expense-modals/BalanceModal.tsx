import React from "react";
import { Typography, Input } from "@material-tailwind/react";
import { IAmount, AmountContextType } from "../../@types/amount";
import { AmountContext } from "../../context/AmountContext";

interface BalanceModalProps {
  getFormData: (formData: IAmount) => void;
  id?: number;
}

function BalanceModal(props: BalanceModalProps) {
  const { amounts } = React.useContext(AmountContext) as AmountContextType;
  const [value, setValue] = React.useState<IAmount>();
  const [formData, setFormData] = React.useState<IAmount>();
  React.useMemo(() => {
    const amountData = amounts.find((obj) => obj.id === props.id);
    setValue(amountData);
  }, [props.id]);
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    const data = {
      ...formData,
      isBalancedAmount: true,
      [e.currentTarget.id]:
        e.currentTarget.id === "amount"
          ? +e.currentTarget.value
          : e.currentTarget.value,
    };
    setFormData(data);
    setValue(data);
    props.getFormData(data);
  };
  return (
    <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Amount
        </Typography>
        <Input
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={value?.amount}
          id="amount"
          onChange={handleForm}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Description
        </Typography>
        <Input
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={value?.description}
          id="description"
          onChange={handleForm}
        />
      </div>
    </form>
  );
}

export default BalanceModal;
