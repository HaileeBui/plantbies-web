import React, { useRef } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

import { CustomButton } from '..'
import Palette from '../../Color'
import PlantAPI from '../../services/PlantAPI'
import { PlantContext } from '../../context/PlantContext'
import validateInfo from '../../services/validateInfo'
import './modal.css'

const ModifyModal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const { plants, setPlants } = React.useContext(PlantContext);
  const { plant, setPlant } = React.useContext(PlantContext);
  const initialValue = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: '',
    barcode: '',
  }
  const [data, setData] = React.useState({});
  const [values, setValues] = React.useState(initialValue);
  const [error, setError] = React.useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  };

  const getPlants = async () => {
    try {
      let data = await PlantAPI().getPlantList();
      setPlants(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const modifyPlant = async (plant, plantid) => {
    try {
      let data = await PlantAPI().modifyPlant(plant, plantid);
      getPlants();
      setShowModal(false);
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleModify = e => {
    e.preventDefault();
    setError(validateInfo(values));
    setError(state => {
      if (Object.keys(state).length === 0) {
        modifyPlant(values,plant.id);
      }
      return state;
    });
  }

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  React.useEffect(() => {
    const getPlant = async () => {
      try {
        let data = await PlantAPI().getPlantDetail(plant.id);
        setData(data);
        setData(state => {
          setValues({
            name: state.name,
            description: state.description,
            price: state.price,
            quantity: state.quantity,
            image: state.image,
            barcode: state.barcode,
          })
          return state;
        })
      } catch (e) {
        console.log(e.message);
      }
    };
    getPlant();
  }, [plant]);

  return (
    <>
      {showModal ?
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <Form className='form' onSubmit={handleModify}>
              <h1>Modify Plant</h1>
              <Text>* is required field</Text>
              <div className='form-inputs'>
                <label htmlFor='name' className='form-label'>
                  Name*
                </label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  className='form-input'
                  placeholder='Enter plant name'
                  value={values.name}
                  onChange={handleChange} />
                {error.name && <p>{error.name}</p>}
              </div>
              <div className='form-inputs'>
                <label htmlFor='description' className='form-label'>
                  Description
                </label>
                <input
                  id='description'
                  type='text'
                  name='description'
                  className='form-input'
                  placeholder='Enter description'
                  value={values.description}
                  onChange={handleChange} />
              </div>
              <div className='form-inputs'>
                <label htmlFor='price' className='form-label'>
                  Price*
                </label>
                <input
                  id='price'
                  type='number'
                  name='price'
                  min={0}
                  step={0.01}
                  precision={2}
                  className='form-input'
                  placeholder='Enter price'
                  value={values.price}
                  onChange={handleChange} />
                {error.price && <p>{error.price}</p>}
              </div>
              <div className='form-inputs'>
                <label htmlFor='quantity' className='form-label'>
                  Quantity*
                </label>
                <input
                  id='quantity'
                  type='number'
                  name='quantity'
                  min={0}
                  className='form-input'
                  placeholder='Enter quantity'
                  value={values.quantity}
                  onChange={handleChange} />
                {error.quantity && <p>{error.quantity}</p>}
              </div>
              <div className='form-inputs'>
                <label htmlFor='image' className='form-label'>
                  Image*
                </label>
                <input
                  id='image'
                  type='text'
                  name='image'
                  className='form-input'
                  placeholder='Enter image url'
                  value={values.image}
                  onChange={handleChange} />
                {error.image && <p>{error.image}</p>}
              </div>
              <div className='form-inputs'>
                <label htmlFor='barcode' className='form-label'>
                  Barcode*
                </label>
                <input
                  id='barcode'
                  type='text'
                  name='barcode'
                  className='form-input'
                  placeholder='Enter barcode'
                  value={values.barcode}
                  onChange={handleChange} />
                {error.barcode && <p>{error.barcode}</p>}
              </div>
              <Bottom>
                <button className='form-input-btn' type='submit'>Modify</button>
                <CustomButton title='Cancel' onClick={() => { setShowModal(prev => !prev) }} color={`${ Palette.darkGrey }`} />
              </Bottom>
            </Form>
          </animated.div>
        </Background>
        : null}
    </>
  )
}

export default ModifyModal

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #model{
    background: white;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: ${ Palette.green };
  padding: 1rem;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: .5rem;
`
const Text = styled.div`
  font-size: 10px;
  color: ${ Palette.darkGrey };
`
