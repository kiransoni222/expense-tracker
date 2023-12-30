import React, { useState } from "react";
import { Typography, Input } from "@material-tailwind/react";
import { IAmount } from "../../@types/amount";

interface ExpenseModalProps {
  getFormData: (formData: IAmount) => void;
  id?: number;
}

function ExpenseModal(props: ExpenseModalProps) {
  const [formData, setFormData] = React.useState<IAmount>();
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    const data = {
      ...formData,
      isBalancedAmount: false,
      [e.currentTarget.id]:
        e.currentTarget.id === "amount"
          ? +e.currentTarget.value
          : e.currentTarget.value,
    };
    setFormData(data);
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
          id="description"
          onChange={handleForm}
        />
      </div>
    </form>
  );
}

export default ExpenseModal;
