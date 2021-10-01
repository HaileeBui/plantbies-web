import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"

import Palette from '../Color';
import { CustomButton } from '.';
import { PlantContext } from '../context/PlantContext';
import { customizedString } from './utils/helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: .7rem;
  width: 15rem;
  height: 20rem;
  border: 1px solid ${ Palette.lightGrey };
  borer-radius: 2px;
  box-shadow: 1px 1.5px 1px  ${ Palette.lightGrey };
  &:hover {
    transform: scale(1.05); 
  }
`;
const Name = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: .1rem;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`
const Price = styled.div`
  margin-left: auto;
  margin-right: 0;
  font-size: 20px;
`
const Image = styled.img`
  height: 15.5rem;
  margin-bottom: .5rem;
`
const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const Quantity = styled.div`

`
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const ProductCard = ({ plant }) => {
  let history = useHistory();
  const { order, setOrder } = React.useContext(PlantContext);
  const { total, setTotal } = React.useContext(PlantContext);

  const handleClick = () => {
    history.push('/detail/' + plant.id + '/');
  }

  const handleAdd = (item) => {
    const exist = order.find(x => x.plant.id === item.id);
    if (exist) {
      setOrder(order.map(x => x.plant.id === item.id ? { ...exist, qty: exist.qty + 1, total: exist.total + exist.plant.price } : x));
      setOrder(state => {
        setTotal(state.reduce((acc, current) => acc + current.total, 0));
        setTotal(state => {
          return state;
        })
        return state;
      })
    } else {
      setOrder([...order, { plant: item, qty: 1, total: item.price }])
      setOrder(state => {
        setTotal(state.reduce((acc, current) => acc + current.total, 0));
        setTotal(state => {
          return state;
        })
        return state;
      })
    }
  }

  return (
    <Container onClick={handleClick}>
      <Image src={plant.image} alt='plant' />
      <Title>
        <Name>{customizedString(plant.name)}</Name>
        <Price>{plant.price.toFixed(2)} €</Price>
      </Title>
      <Bottom>
        {plant.quantity > 5 ? <Quantity>In stock</Quantity> : <Quantity>Only {plant.quantity} left</Quantity>}
        <CustomButton
          disabled={plant.quantity === 0}
          title='+'
          onClick={(e) => {
            handleAdd(plant);
            e.stopPropagation()
          }}
          style={{ padding: '.5px 4px' }} />
      </Bottom>
    </Container>
  )
}

export default ProductCard