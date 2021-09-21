import React from 'react'
import Select from 'react-select'
import Palette from '../Color';

const options = [
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
];

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    padding: 20,
  }),

  control: (provided, { selectProps: { width }}) => ({
    ...provided,
    width: width,
    border: `1px solid ${Palette.darkGreen}`,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const SortBar = ({input,onChange}) => {
  return (
      <Select 
      width='15rem' 
      styles={customStyles} 
      options={options}
      placeholder="Sorted by"
      isClearable
      onChange={onChange} />
  )
}

export default SortBar;
