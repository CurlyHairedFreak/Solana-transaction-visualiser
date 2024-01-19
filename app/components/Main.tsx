"use client";

import { useState } from "react";
import Form from "../components/Form";
import useForm from "../containers/useForm";
import useFetch from "../containers/useFetch";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Main: React.FC = () => {
  // Call custom hooks to populate variables
  const inputTransaction = useForm();
  const { fetchTransaction, transaction, transactionSuccess } = useFetch(
    inputTransaction.value
  );

  console.log(transaction);

  return (
    <div className="flex flex-col items-center mt-28 w-11/12 justify-center m-auto">
      <h2 className="text-2xl italic font-semibold tracking-wide">
        Explore Solana Transactions
      </h2>
      <Form
        // passes down handleChange function from useForm custom hook
        handleChange={inputTransaction.handleChange}
        //  passes down fetchTransaction function from useFetch custom hook
        fetchTransaction={fetchTransaction}
      />
      {/* conditional rendering on result of fetchTransaction function */}
      {transactionSuccess === false && (
        <p className="mt-6 text-red-600">Please enter a valid transaction ID</p>
      )}
      {transactionSuccess && transaction !== null && (
        <div className="flex flex-col w-1/2 mx-auto mt-12 max-w-screen-xs sm:w-3/4 text-center">
          <h2 className="mb-3 text-center text-xl">Transaction Details</h2>
          <p className="mt-2 break-words">
            <span className="font-bold">Signature: </span>{" "}
            {transaction.data.signature}
          </p>
          <p className="mt-2">
            <span className="font-bold">Fee:</span>{" "}
            {transaction.data.fee / LAMPORTS_PER_SOL} SOL
          </p>
          <p className="mt-2 break-words">
            <span className="font-bold">Timestamp:</span>{" "}
            {transaction.data.blockTime &&
              new Date(transaction.data.blockTime * 1000).toLocaleString()}
            <span className="font-bold">{" / Blocktime: "}</span>
            {transaction.data.blockTime}
          </p>
          <p className="mt-2">
            <span className="font-bold">Slot:</span>{" "}
            {Intl.NumberFormat()
              .format(transaction.data.slot)
              .replaceAll(",", ", ")}
          </p>
          <p className="mt-2 break-words">
            <span className="font-bold">Previous Blockhash:</span>{" "}
            {transaction.data.previousBlockhash}
          </p>
        </div>
      )}
    </div>
  );
};

export default Main;
