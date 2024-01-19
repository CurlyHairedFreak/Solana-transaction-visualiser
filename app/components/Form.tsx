import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormProps {
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  fetchTransaction: () => Promise<void>;
}

const Form = ({ handleChange, fetchTransaction }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    //  prvents default page reload when button is pressed
    e.preventDefault();
    // resets input field
    target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-6/12 mt-4">
      <input
        type="text"
        placeholder="Enter Devnet Transaction"
        onChange={handleChange}
        className="text-center border-solid border-gray-400 border-2 rounded "
      />
      <button
        onClick={() => fetchTransaction()}
        className=" w-12  pt-1 pb-1  border-gray-200 border-solid border-2 m-auto mt-4 shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all rounded"
      >
        {
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="h-4 w-8 m-auto"
          />
        }
      </button>
    </form>
  );
};

export default Form;
