import { useState } from "react";

// Custom Hook
const useForm = () => {
  // Initialise state to hold input value
  const [value, setValue] = useState<string>("");
  //  Function that updates state to input value when changed
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  // returns state and
  return {
    value,
    handleChange,
  };
};

export default useForm;
