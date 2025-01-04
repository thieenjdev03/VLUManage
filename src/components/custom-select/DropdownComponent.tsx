import React from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';

type OptionType = {
  value: string | number;
  label: string;
};

type CustomSelectProps = {
  placeholder?: string;
  options?: OptionType[];
  onChange?: (selectedOption: SingleValue<any>) => void;
  id?: string;
  label?: string;
  value?: OptionType;
};
const customStyles: StylesConfig<OptionType> = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#D62134' : '#FFFFFF',
  }),
  control: (provided) => ({
    ...provided,
    borderColor: '#B0BEC5', // Màu viền input
    boxShadow: 'none',
  }),
};
const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder = '',
  options = [],
  onChange = () => {},
  id = '',
  label = '',
  value = { value: '', label: '' },
}) => (
  <div>
    {label && (
      <label className="mb-2" htmlFor={id}>
        {label}
      </label>
    )}
    <Select
      inputId={id}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      styles={customStyles}
    />
  </div>
);

export default CustomSelect;
