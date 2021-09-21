import React from 'react';
import styled from 'styled-components';

import SortBar from '../components/SortBar';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import PlantAPI from '../services/PlantAPI';
import { PlantContext } from '../context/PlantContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`
const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2rem;
  justify-content: center;
`

const Home = () => {
  const {plants, setPlants} = React.useContext(PlantContext);
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [select, setSelect] = React.useState('');

  const handleOnChange = (event) => {
    setInput(event.target.value)
  };

  const handleSelect = (event) => {
    if (event != null) {
      setSelect(event.value);
      setSelect(state => {
        if (state === 'name') {
          setPlants(plants.sort((a, b) => a.name > b.name ? 1 : -1))
        };
        if (state === 'price') {
          setPlants(plants.sort((a, b) => a.price - b.price));
        };
        return state;
      })
    } else {
      getPlants();
    }
  }
  const getPlants = async () => {
    try {
      let data = await PlantAPI().getPlantList();
      setPlants(data);
      setLoading(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const filteredList = () =>
    input.length > 0 ? plants.filter(plant => plant.name.toLocaleLowerCase().includes(input) || plant.barcode.toLocaleLowerCase().includes(input)) : plants

  React.useEffect(() => {
    getPlants();
  }, []);

  return (
    loading ?
      <Container>
        <SearchBar onChange={handleOnChange} />
        <SortBar onChange={handleSelect} />
        <ListContainer>
          {filteredList().map((item, index) => <ProductCard key={index} plant={item} />)}
        </ListContainer >
      </Container>
      : <Container>Loading</Container>
  )
}

export default Home