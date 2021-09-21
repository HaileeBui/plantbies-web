import React from 'react'
import styled from 'styled-components'
import Palette from '../Color';

const Button = styled.button`
  background-color: ${props => props.color ? props.color : `${Palette.btnGreen}`};
  color: white;
  width: fit-content;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  margin: .1rem;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    cursor: default;
    background-color: ${Palette.lightGrey}
  }
`;
const CustomButton = ({title, disabled, onClick, ...props}) => {
  return (
    <Button {...props} disabled={disabled} onClick={onClick}>
      {title} 
    </Button>
  )
}

export default CustomButton