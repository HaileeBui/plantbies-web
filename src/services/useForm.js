import React from 'react'
import PlantAPI from './PlantAPI';
import { PlantContext } from '../context/PlantContext';

const useForm = (validate) => {
  const { plants, setPlants } = React.useContext(PlantContext);

  const [values, setValues] = React.useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: '',
    barcode: '',
  });
  const [errors, setErrors] = React.useState({});


  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  };

  const cancelSubmit = () => {
    setErrors({});
    setValues({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: '',
      barcode: '',
    });
  }

  const handleSubmit = () => {
    setErrors(validate(values));
    setValues({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: '',
      barcode: '',
    });
  }

  return { handleChange, values, handleSubmit, errors, cancelSubmit };
};

export default useForm;