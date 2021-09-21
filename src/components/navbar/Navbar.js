import React from 'react'
import styled from 'styled-components'
import { FaShoppingBag, FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";

import Palette from '../../Color';
import { PlantContext } from '../../context/PlantContext';
import './navbar.css'

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: black;
  }   
`
const Cart = styled(FaShoppingBag)`
  font-size: 2rem;
`
const Total = styled.span`
	font-size: 1.5rem;
	margin: .5rem;
`

const Navbar = () => {
	const { total, setTotal } = React.useContext(PlantContext);
	const [menu, setMenu] = React.useState('');

	const setMenuClass = () => {
		if (menu === '') {
			setMenu('toggled');
		} else {
			setMenu('');
		}
	}

	return (
		<div>
			<div className={`top-menu ${ menu }`} >
				<div className='top-menu-lead'>Plantbies</div>
				<div className='left'>
					<div className='top-menu-item'>
						<NavLink to="/" activeStyle={{ color: 'black' }} exact>
							Home
						</NavLink></div>
					<div className='top-menu-item'>
						<NavLink to="/admin" activeStyle={{ color: 'black' }} exact >
							Admin
						</NavLink>
					</div>
				</div>
				<div className='right'>
					<NavLink to="/shopping-cart" activeStyle={{ color: 'black' }} exact>
						<Cart />
						<Total>{total > 0 ? `${ total.toFixed(2) }€` : ''}</Total>
					</NavLink>
				</div>
				<div className='top-menu-icon' onClick={setMenuClass}>
					<FaBars />
				</div>
				<div className='clear-fix' />
			</div>
		</div>
	)
}

export default Navbar

/**<Nav>
			<NavLogo to="/">
				Plantbies
			</NavLogo>
			<NavLink to="/" activeStyle={{color:'black'}} exact>
				Home
			</NavLink>
			<NavLink to="/admin" activeStyle={{color:'black'}} exact >
				Admin
			</NavLink>
			<NavLink to="/shopping-cart" activeStyle={{color:'black'}} exact>
				<Total>{total > 0 ? `${total}€` :  ''}</Total>
				<Cart />
			</NavLink>
		</Nav>	 */