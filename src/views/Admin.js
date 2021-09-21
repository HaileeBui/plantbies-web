import React from 'react'
import styled from 'styled-components'
import { MdDelete } from 'react-icons/md'
import { FaTools } from 'react-icons/fa'

import { CustomButton } from '../components'
import PlantAPI from '../services/PlantAPI'
import Palette from '../Color'
import { FormModal, ModifyModal } from '../components'
import { PlantContext } from '../context/PlantContext'
import ConfirmDelete from '../components/modal/ConfirmDelete'

const addButton = {
  marginBottom: '1rem',
  marginRight: 0,
  marginLeft: 'auto',
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`
const H1 = styled.h1`
  margin-bottom: 2rem;
`
const Des = styled.td`
  text-align: jusitfy;
  vertical-align: top;
  border:1px solid black;
  padding: .5rem;
`
const Td = styled.td`
  vertical-align: top;
  border: 1px solid black;
  padding: .5rem;
  text-align: center;
`
const Table = styled.table`
  border: 1px solid black;
`
const Th = styled.th`
  text-align: center;
`
const Admin = () => {
  const { plants, setPlants } = React.useContext(PlantContext);
  const { plant, setPlant } = React.useContext(PlantContext);
  const [loading, setLoading] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openModify, setOpenModify] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const getPlants = async () => {
    try {
      let data = await PlantAPI().getPlantList();
      setPlants(data);
      setLoading(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAddBtn = () => {
    setOpenAdd(prev => !prev);
  }

  const handleModifyBtn = (item) => {
    setPlant(item);
    setOpenModify(prev => !prev);
  }

  const handleDeleteBtn = (item) => {
    setPlant(item);
    setOpenDelete(prev => !prev);
  }

  React.useEffect(() => {
    getPlants();
  }, []);
  return (
    loading ?
      <Container>
        <H1>Products</H1>
        <CustomButton title='Add products' style={addButton} onClick={handleAddBtn} />
        <Table>
          <thead />
          <tbody>
            <tr>
              <Th>Id</Th>
              <Th>Photo</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Quanity</Th>
              <Th>Price(€)</Th>
              <Th>Barcode</Th>
              <Th>Action</Th>
            </tr>
            {plants.map((item, index) =>
              <tr key={index}>
                <Td>{item.id}</Td>
                <Td><img src={item.image} alt='' style={{ width: '5rem', height: '5rem' }} /></Td>
                <Td>{item.name}</Td>
                <Des>{item.description}</Des>
                <Td>{item.quantity}</Td>
                <Td>{item.price}</Td>
                <Td>{item.barcode}</Td>
                <Td>
                  <IconButton color={`${ Palette.darkGreen }`} icon={false} onClick={() => handleModifyBtn(item)} />
                  <IconButton color={`${ Palette.red }`} icon={true} onClick={() => handleDeleteBtn(item)} />
                </Td>
              </tr>
            )}
          </tbody>
          <tfoot />
        </Table>
        <FormModal showModal={openAdd} setShowModal={setOpenAdd} />
        <ModifyModal showModal={openModify} setShowModal={setOpenModify} />
        <ConfirmDelete showModal={openDelete} setShowModal={setOpenDelete} />
      </Container>
      : <Container>Loading</Container>
  )
}

export default Admin

export const IconButton = ({ icon, onClick, ...props }) => {
  return (
    <Button {...props} onClick={onClick}>
      {icon ? <MdDelete style={iconBtnStyle, delBtn} /> : <FaTools style={iconBtnStyle, modifyBtn} />}
    </Button>
  )
}

const Button = styled.button`
  background-color: #ffffff;
  border: 1px solid ${ props => props.color ? props.color : `${ Palette.btnGreen }` };
  color: white;
  width: fit-content;
  padding: 2px;
  margin: .2rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    cursor: default;
  }
`;

const iconBtnStyle = {
  fontSize: '1rem',
}
const modifyBtn = {
  color: `${ Palette.darkGreen }`,
}
const delBtn = {
  color: `${ Palette.red }`,
}