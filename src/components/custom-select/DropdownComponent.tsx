import React from "react";
import Select, { SingleValue } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  placeholder?: string;
  options?: OptionType[];
  onChange?: (option: SingleValue<OptionType>) => void;
  id?: string;
  label?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder = "",
  options = [],
  onChange = () => { },
  id = "",
  label = "",
}) => (
  <div>
    {label && <label className="mb-2" htmlFor={id}>{label}</label>}
    <Select
      inputId={id}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);


export default CustomSelect;
