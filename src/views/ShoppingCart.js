import React from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router';

import CustomButton from '../components/CustomButton';
import { PlantContext } from '../context/PlantContext';
import { IconButton } from './Admin';
import Palette from '../Color';
import PlantAPI from '../services/PlantAPI';

const Container = styled.div`
	margin: auto;
	margin-top: 5rem;
	display: flex;
	max-width: 700px;
	flex-direction: column;
	justiy-content: center;
	align-items: center;
	padding: 1rem;
	flex-wrap: wrap;
`
const Bottom = styled.div`
	margin-right: 0;
	margin-left: auto;
	padding-top: 1rem;
	padding-right: 1rem;
	max-width: 600px;
	@media (max-width: 500px) {
    margin: auto;
  }
`
const Button = styled.button`
	background-color: #ffffff;
  border: 1px solid ${ props => props.color ? props.color : `${ Palette.btnGreen }` };
  color: black;
  width: fit-content;
  margin: .3rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
const Tr = styled.tr`
	border-bottom: 1px solid ${ Palette.lightGrey };
`
const Th = styled.th`
  text-align: center;
	width: 8rem;
	padding-bottom: 1rem;
	flex-wrap: wrap;
`
const Td = styled.td`
  padding: 1rem;
  text-align: center;
`
const ShoppingCart = () => {
	let history = useHistory();

	const { order, setOrder } = React.useContext(PlantContext);
	const { total, setTotal } = React.useContext(PlantContext);
	const { plants, setPlants } = React.useContext(PlantContext);

	const handleClick = (plant) => {
		history.push('/detail/' + plant.id + '/');
	}

	const handleAdd = item => {
		const exist = order.find(x => x.plant.id === item.id);
		if (exist) {
			setOrder(order.map(x => x.plant.id === item.id ? { ...exist, qty: exist.qty + 1, total: exist.total + exist.plant.price } : x));
			setOrder(state => {
				setTotal(state.reduce((acc, current) => acc + current.total, 0));
				setTotal(state => {
					console.log(state);
					return state;
				});
				return state;
			});
		} else {
			setOrder([...order, { plant: item, qty: 1, total: item.price }]);
			setOrder(state => {
				setTotal(state.reduce((acc, current) => acc + current.total, 0));
				setTotal(state => {
					console.log(state);
					return state;
				});
				return state;
			});
		}
	}

	const modifyPlant = async (plant, plantid) => {
		try {
			let data = await PlantAPI().modifyPlant(plant, plantid);
			getPlants();
			return data;
		} catch (e) {
			console.log(e.message);
		}
	}

	const handleConfirm = (order) => {
		for (let i = 0; i < order.length; i++) {
			const plant = plants.find(x => x.id === order[i].plant.id);
			if (order[i].qty <= plant.quantity) {
				const data = { quantity: plant.quantity - order[i].qty };
				modifyPlant(data, order[i].plant.id);
			} else {
				alert(`Plant ${ order[i].plant.name } is out of stock. Only ${ plant.quantity } left.`);
				return true;
			}
		}
		setOrder([]);
	};

	const getPlants = async () => {
		try {
			let data = await PlantAPI().getPlantList();
			setPlants(data);
		} catch (e) {
			console.log(e.message);
		}
	};

	const handleReduce = item => {
		const exist = order.find(x => x.plant.id === item.id);
		if (exist.qty === 1) {
			setOrder(order.filter(x => x.plant.id !== item.id));
			setOrder(state => {
				setTotal(state.reduce((acc, current) => acc + current.total, 0));
				setTotal(state => {
					console.log(state);
					return state;
				});
				return state;
			});
		} else {
			setOrder(order.map(x => x.plant.id === item.id ? { ...exist, qty: exist.qty - 1, total: exist.total - exist.plant.price } : x));
			setOrder(state => {
				setTotal(state.reduce((acc, current) => acc + current.total, 0));
				setTotal(state => {
					console.log(state);
					return state;
				});
				return state;
			});
		}
	};

	const handleRemove = item => {
		const exist = order.find(x => x.plant.id === item.id);
		if (exist) {
			setOrder(order.filter(x => x.plant.id !== item.id));
			setOrder(state => {
				setTotal(state.reduce((acc, current) => acc + current.total, 0));
				setTotal(state => {
					console.log(state);
					return state;
				});
				return state;
			});
		}
	}

	return (
		<Container>
			<h2 style={{ marginBottom: '2rem' }}>Cart Items</h2>
			{order.length === 0 ? <div>Cart is empty</div> :
				<>
					<table>
						<thead />
						<tbody>
							<Tr>
								<Th>Photo</Th>
								<Th>Name</Th>
								<Th style={{ width: '10rem' }}>Quanity</Th>
								<Th>Price</Th>
								<Th style={{ width: '9rem' }}>Total</Th>
								<Th></Th>
							</Tr>
							{order.map((item, index) =>
								<Tr key={index} onClick={() => handleClick(item.plant)}>
									<Td><img src={item.plant.image} alt='' style={{ width: '3rem', height: '3rem' }} /></Td>
									<Td>{item.plant.name}</Td>
									<Td>
										<Button onClick={(e) => { e.stopPropagation(); handleReduce(item.plant) }}>-</Button>
										{item.qty}
										<Button onClick={(e) => { e.stopPropagation(); handleAdd(item.plant) }}>+</Button>
									</Td>
									<Td>{item.plant.price.toFixed(2)}</Td>
									<Td>{item.total.toFixed(2)}</Td>
									<Td>
										<IconButton color={`${ Palette.red }`} icon={true} onClick={(e) => { e.stopPropagation(); handleRemove(item.plant) }} />
									</Td>
								</Tr>
							)}
						</tbody>
						<tfoot />
					</table>
					<Bottom>
						<div style={{ fontSize: '20px' }}>Total: <strong>{total.toFixed(2)}€</strong></div>
						<CustomButton title='Confirm' onClick={() => handleConfirm(order)} />
					</Bottom>
				</>
			}
		</Container>
	)
}

export default ShoppingCart