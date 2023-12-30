import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import PopupModal from "../shared/PopupModal";
import BalanceModal from "./balnce-expense-modals/BalanceModal";
import ExpenseModal from "./balnce-expense-modals/ExpenseModal";
import { AmountContext } from "../context/AmountContext";
import { AmountContextType, IAmount } from "../@types/amount";
import Amounts from "../containers/Amounts";
function AmountBalanceComponent() {
  const [isOpenAmount, setIsOpenAmount] = React.useState(false);
  const [isOpenExpense, setIsOpenExpense] = React.useState(false);
  const [balanceAmount, setBalanceAmount] = React.useState<IAmount>();
  const [expenseAmount, setExpenseAmount] = React.useState<IAmount>();
  const [amountId, setAmountId] = React.useState(0);
  const { amounts, saveAmount, updateAmount } = React.useContext(
    AmountContext
  ) as AmountContextType;

  const onSaveAddedAmount = () => {
    const allBalancedAmounts = amounts.filter(
      (amount) => amount.isBalancedAmount
    );
    let totalAmount = 0;
    if (allBalancedAmounts) {
      totalAmount = allBalancedAmounts.reduce((obj, { amount }) => {
        return obj + amount;
      }, 0);
    }
    balanceAmount.totalAmount = totalAmount + balanceAmount.amount;
    if (amountId) {
      updateAmount(amountId);
    } else {
      saveAmount(balanceAmount);
    }
    setIsOpenAmount(false);
  };

  const onSaveExpenseAmount = () => {
    const allBalancedAmounts = amounts.filter(
      (amount) => amount.isBalancedAmount
    );
    let totalAmount = 0;
    if (allBalancedAmounts) {
      totalAmount = allBalancedAmounts.reduce((obj, { amount }) => {
        return obj + amount;
      }, 0);
    }

    const allExpenseAmounts = amounts.filter(
      (amount) => !amount.isBalancedAmount
    );
    let totalExpense = 0;
    if (allExpenseAmounts) {
      totalExpense = allExpenseAmounts.reduce((obj, { amount }) => {
        return obj + amount;
      }, 0);
    }

    expenseAmount.totalExpense = totalExpense + expenseAmount.amount;
    expenseAmount.totalAmount = totalAmount - expenseAmount.amount;
    if (expenseAmount.amount <= totalAmount) {
      saveAmount(expenseAmount);
      setIsOpenExpense(false);
    } else {
      alert("Not enough balance");
    }
  };

  const onUpdate = (amount: IAmount) => {
    if (amount.isBalancedAmount) {
      setIsOpenAmount(true);
    } else {
      setIsOpenExpense(true);
    }
    setAmountId(amount.id);
  };

  return (
    <>
      <Card variant="gradient" className="w-full p-8">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography variant="h2" className="font-normal">
            Expense tracker
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <div className="mb-6 flex gap-3">
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
              Balance
              {amounts && amounts.length > 0 && (
                <div>{amounts[amounts.length - 1].totalAmount}</div>
              )}
            </div>
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
              Expense
              {amounts && amounts.length > 0 && (
                <div>{amounts[amounts.length - 1].totalExpense}</div>
              )}
            </div>
          </div>
          <Typography variant="h3" className="font-normal mt-4">
            Transaction
          </Typography>
          <div className="mb-6 mt-6">
            <div className="max-w-sm w-full mb-5">
              <Button onClick={() => setIsOpenAmount(true)}>Add amount</Button>
            </div>
            <div className="max-w-sm w-full">
              <Button onClick={() => setIsOpenExpense(true)}>
                Add expense
              </Button>
            </div>
          </div>
          <ul className="flex flex-col gap-4 mt-3">
            <Amounts onUpdate={(amount: IAmount) => onUpdate(amount)} />
          </ul>
        </CardBody>
      </Card>
      <PopupModal
        isOpen={isOpenAmount}
        title="Add amount"
        onConfirmModal={() => onSaveAddedAmount()}
        onCloseModal={() => setIsOpenAmount(false)}
      >
        <BalanceModal
          id={amountId}
          getFormData={(data) => setBalanceAmount(data)}
        />
      </PopupModal>
      <PopupModal
        isOpen={isOpenExpense}
        title="Add expense"
        onConfirmModal={() => onSaveExpenseAmount()}
        onCloseModal={() => setIsOpenExpense(false)}
      >
        <ExpenseModal
          id={amountId}
          getFormData={(data) => setExpenseAmount(data)}
        />
      </PopupModal>
    </>
  );
}

export default AmountBalanceComponent;
