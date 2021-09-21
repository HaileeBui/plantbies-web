import React, {useState} from 'react';

const PlantContext = React.createContext([{}, () => {}]);

const plantArray = [];

const PlantProvider = (props) => {
  const [plants, setPlants] = useState(plantArray);
  const [plant, setPlant] = useState({});
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  return (
    <PlantContext.Provider value={{plants, setPlants, plant, setPlant, order, setOrder, total, setTotal}}>
      {props.children}
    </PlantContext.Provider>
  );
};

export {PlantContext, PlantProvider};
