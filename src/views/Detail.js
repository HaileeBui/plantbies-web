import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Palette from '../Color'

import { CustomButton } from '../components'
import PlantAPI from '../services/PlantAPI'
import { PlantContext } from '../context/PlantContext'

const Container = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: row;
	margin: auto;
	margin-top: 5rem;
	border: 1px solid ${ Palette.green };
	border-radius: 2px;
	max-width: 580px;
	@media (max-width: 500px) {
    flex-direction: column
  }
`
const Info = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
`
const Name = styled.div`
	font-weight: bold;
	font-size: 25px;
	padding-bottom: .2rem;
`
const Des = styled.div`
	text-align: justify;
	padding-bottom: .2rem;
	overflow: hidden;
`
const Quan = styled.div`
	font-weight: bold;
`
const Img = styled.img`
	height: 15.5rem;
	width: 15rem;
`
const Detail = () => {
	const { id } = useParams()
	const { order, setOrder } = React.useContext(PlantContext);
	const {total, setTotal} = React.useContext(PlantContext);

	const [plant, setPlant] = React.useState({});
	const [loading, setLoading] = React.useState(false);

	const handleAdd = (item) => {
		const exist = order.find(x => x.plant.id === item.id);
		if (exist) {
      setOrder(order.map(x => x.plant.id === item.id ? { ...exist , qty: exist.qty + 1, total: exist.total + exist.plant.price } : x));
			setOrder(state=>{
        setTotal(state.reduce((acc,current) => acc + current.total, 0));
        return state;
      })
		} else {
			setOrder([...order, { plant: item, qty: 1, total: item.price }])
			setOrder(state=>{
        setTotal(state.reduce((acc,current) => acc + current.total, 0));
        return state;
      })
		}
	}

	React.useEffect(() => {
		const getPlant = async () => {
			try {
				let data = await PlantAPI().getPlantDetail(id);
				setPlant(data);
				setLoading(true);
			} catch (e) {
				console.log(e.message);
			}
		};
		getPlant();
	}, []);
	return (
		loading ?
			<Container>
				<Img src={plant.image} alt={plant.name} />
				<Info>
					<Name>{plant.name} - {plant.price.toFixed(2)}€ </Name>
					<Des>{plant.description}</Des>
					<Quan>{plant.quantity > 5 ? <p>In stock</p> : <p>Only {plant.quantity} left</p>}</Quan>
					<CustomButton title="Add to cart" disabled={plant.quantity === 0} onClick={() => handleAdd(plant)} />
				</Info>
			</Container>
			:
			<Container>Loading</Container>
	)
}

export default Detail