import React from "react";
import {
  clusterApiUrl,
  Connection,
  ParsedTransactionWithMeta,
} from "@solana/web3.js";

interface TransactionDetails {
  data: {
    signature?: string;
    fee?: number;
    blockTime?: number | null;
    slot?: number;
    previousBlockhash?: string;
  };
}
//  Accepts value from input field as parameter to search for transaction details using solana web3.js
const useFetch = (inputValue: string) => {
  // create connection to solana/web3.js
  const connection = new Connection(clusterApiUrl("devnet", true), "confirmed");

  // Initialise states
  const transactionId: string = inputValue;
  const [transactionSuccess, SetTransactionSuccess] = React.useState<
    boolean | string
  >("");
  const [transaction, setTransaction] =
    React.useState<TransactionDetails | null>(null);
  // Async function to fetch transaction
  const fetchTransaction = async () => {
    // try uses the input value(searched transaction id) to fetch transaction and set state
    try {
      const txSearchResult: ParsedTransactionWithMeta | null =
        await connection.getParsedTransaction(transactionId, "confirmed");
      setTransaction({
        data: {
          signature: txSearchResult?.transaction?.signatures[0],
          fee: txSearchResult?.meta?.fee,
          blockTime: txSearchResult?.blockTime,
          slot: txSearchResult?.slot,
          previousBlockhash:
            txSearchResult?.transaction.message.recentBlockhash,
        },
      });
      // set state for conditional rendering

      SetTransactionSuccess(true);
    } catch (err) {
      // if input value(searched transaction id) is invalid an error will show in the console
      console.log(`Please enter a valid devnet transaction Id. Error: ${err}`);
      //  set state for conditional rendering to show and error message on page
      SetTransactionSuccess(false);
    }
  };
  // returns function and states for use in main.tsx
  return {
    fetchTransaction,
    transactionSuccess,
    transaction,
  };
};

export default useFetch;
