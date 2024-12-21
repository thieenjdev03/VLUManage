import React from "react";
import Select, { SingleValue } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue" },
];

const CustomSelect: React.FC = () => {
  const handleChange = (option: SingleValue<OptionType>) => {
    console.log("Selected:", option);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      placeholder="Chọn công nghệ..."
    />
  );
};

export default CustomSelect;
