import React, { useRef } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

import { CustomButton } from '..'
import Palette from '../../Color'
import PlantAPI from '../../services/PlantAPI'
import { PlantContext } from '../../context/PlantContext'
import './modal.css'

const ConfirmDelete = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const { plants, setPlants } = React.useContext(PlantContext);
  const { plant, setPlant } = React.useContext(PlantContext);

  const getPlants = async () => {
    try {
      let data = await PlantAPI().getPlantList();
      console.log('data', data);
      setPlants(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const delPlant = async (plantid) => {
    try {
      let data = await PlantAPI().deletePlant(plantid);
      console.log('data', data);
      getPlants();
      setShowModal(false);
    } catch (e) {
      console.log(e.message);
    }
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

  return (
    <>
      {showModal ?
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <Container>
            <p>Are you sure to delete?</p>
            <Bottom>
              <CustomButton title='Delete' color={`${ Palette.red }`} onClick={() => delPlant(plant.id)} >Delete</CustomButton>
              <CustomButton title='Cancel' onClick={() => { setShowModal(prev => !prev) }} color={`${ Palette.darkGrey }`} />
            </Bottom>
            </Container>
          </animated.div>
        </Background>
        : null}
    </>
  )
}
export default ConfirmDelete

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
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: .5rem;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${ Palette.green };
  padding: 1rem;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`