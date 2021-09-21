import React, { useRef } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

import PlantAPI from '../../services/PlantAPI'
import { CustomButton } from '..'
import Palette from '../../Color'
import useForm from '../../services/useForm'
import validateInfo from '../../services/validateInfo'
import './modal.css'
import { PlantContext } from '../../context/PlantContext'

const FormModal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const { plants, setPlants } = React.useContext(PlantContext)
  const { handleChange, values, handleSubmit, errors, cancelSubmit } = useForm(validateInfo);
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

  const getPlants = async () => {
    try {
      let data = await PlantAPI().getPlantList();
      setPlants(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const postPlant = async (plant) => {
    try {
      let data = await PlantAPI().addPlant(plant);
      console.log(data);
      getPlants();
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleCancel = () => {
    cancelSubmit();
    setShowModal(prev => !prev);
  };

  const handleClick = (e) => {
    e.preventDefault();
      postPlant(values);
      cancelSubmit();
      alert('Successfully added!');
  }

  return (
    <>
      {showModal ?
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <Form onSubmit={handleClick}>
              <h1>Add New Plant</h1>
              <Text>* is required field</Text>
              <div className='form-inputs'>
                <label className='form-label'>
                  Name*
                </label>
                <input
                  required
                  id='name'
                  type='text'
                  name='name'
                  className='form-input'
                  placeholder='Enter plant name'
                  value={values.name}
                  onChange={handleChange} />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div className='form-inputs'>
                <label className='form-label'>
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
                <label className='form-label'>
                  Price*
                </label>
                <input
                  required
                  id='price'
                  type='number'
                  name='price'
                  step={0.01}
                  precision={2}
                  min={0}
                  className='form-input'
                  placeholder='Enter price'
                  value={values.price}
                  onChange={handleChange} />
                {errors.price && <p>{errors.price}</p>}
              </div>
              <div className='form-inputs'>
                <label className='form-label'>
                  Quantity*
                </label>
                <input
                  required
                  id='quantity'
                  type='number'
                  name='quantity'
                  min={0}
                  className='form-input'
                  placeholder='Enter quantity'
                  value={values.quantity}
                  onChange={handleChange} />
                {errors.quantity && <p>{errors.quantity}</p>}
              </div>
              <div className='form-inputs'>
                <label className='form-label'>
                  Image*
                </label>
                <input
                  required
                  id='image'
                  type='text'
                  name='image'
                  className='form-input'
                  placeholder='Enter image url'
                  value={values.image}
                  onChange={handleChange} />
                {errors.image && <p>{errors.image}</p>}
              </div>
              <div className='form-inputs'>
                <label className='form-label'>
                  Barcode*
                </label>
                <input
                  required
                  id='barcode'
                  type='text'
                  name='barcode'
                  className='form-input'
                  placeholder='Enter barcode'
                  value={values.barcode}
                  onChange={handleChange} />
                {errors.barcode && <p>{errors.barcode}</p>}
              </div>
              <Bottom>
                <button className='form-input-btn' type='submit'>Submit</button>
                <CustomButton title='Cancel' onClick={handleCancel} color={`${ Palette.darkGrey }`} />
              </Bottom>
            </Form>
          </animated.div>
        </Background>
        : null}
    </>
  )
}

export default FormModal

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
