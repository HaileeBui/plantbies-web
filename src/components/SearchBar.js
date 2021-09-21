import React from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'
import Palette from '../Color'

const Container = styled.div`
  display: flex;
	flex-direction: row;
	margin: 1rem;
	align-item: center;
	border: 1px solid ${Palette.darkGreen};
	border-radius: 5px;
	padding: .5rem;
	width: 15rem;
`
const Input = styled.input`
	border: none;
	border-color: transparent;
	width: 15rem;
	font-size: 15px;
	margin-left: .2rem;
	&:focus {
		outline: none;
	}
`
const SearchBar = ({ onChange }) => {
	return (
		<Container>
			<span><FaSearch /></span>
			<Input
				placeholder='Search name or barcode'
				onChange={onChange}/>
		</Container>
	)
}

export default SearchBar