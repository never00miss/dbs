import React from 'react'
import { useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonToolbar, Modal, Placeholder } from 'rsuite'

import { CButton } from '../../Components/CButton'
import { CContainer } from '../../Components/CContainer'
import { CContent } from '../../Components/CContent'
import { CHeader } from '../../Components/CHeader'
import { CText } from '../../Components/CText'
import { Cell } from '../RegisterScreen/Components/cell'
import { GetBeautifyDate } from './function'

const styles = {
  border: '1px solid #f0f0f0',
  width: '100%'
}

export const MemberListScreen = () => {
  const navigate = useNavigate()
  const { userData } = useStore().getState()

  const HandleAddMember = () => {
    return navigate('/addmember')
  }

  const [open, setOpen] = React.useState(false)
  const [modalData, setModalData] = React.useState({
    title: 'set',
    data: [],
    type: 'phone'
  })

  const handleClose = () => setOpen(false)

  const HandleOpenPhone = key => {
    setModalData({
      title: `USER : ${userData[key].name}`,
      data: userData[key].phone,
      type: 'phone'
    })

    setOpen(true)
  }

  const HandleOpenFamily = key => {
    setModalData({
      title: `USER : ${userData[key].name}`,
      data: userData[key].family,
      type: 'family'
    })

    setOpen(true)
  }

  return (
    <CContainer>
      <CHeader>
        <CText>Member List</CText>
      </CHeader>
      <CContent>
        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>{modalData.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalData.type == 'phone' ? (
              <CText>Phone Number</CText>
            ) : (
              <CText>Family</CText>
            )}
            {modalData.type == 'phone' &&
              Array.isArray(modalData.data) &&
              modalData.data.map((val, key) => {
                return <CText>{val.phoneNumber}</CText>
              })}
            <table style={styles}>
              {modalData.type == 'family' &&
                Array.isArray(modalData.data) &&
                modalData.data.map((val, key) => {
                  return (
                    <>
                      <thead style={styles}>
                        <tr style={styles}>
                          <Cell>{val.name}</Cell>
                          <Cell>{GetBeautifyDate(val.birthdate)}</Cell>
                          <Cell>{val.relation}</Cell>
                        </tr>
                      </thead>
                    </>
                  )
                })}
            </table>
            <CText></CText>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance='primary'>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <div className='container'>
          <div className='pt-3 pb-3'>
            <CButton
              label='Tambah Member'
              appearance='primary'
              onClick={HandleAddMember}
            />
          </div>
          <table style={styles}>
            <thead style={styles}>
              <tr style={styles}>
                <Cell>User</Cell>
                <Cell>E-KTP</Cell>
                <Cell>Address</Cell>
                <Cell>Job</Cell>
                <Cell style={{width: 100}}>Date of Birth</Cell>
                <Cell>Phone</Cell>
                <Cell>Family</Cell>
              </tr>
            </thead>
            <tbody style={styles}>
              {userData &&
                userData.map((val, key) => {
                  return (
                    <tr key={key} style={styles}>
                      <Cell>{val.name}</Cell>
                      <Cell>{val.ektpNumber}</Cell>
                      <Cell>{val.address}</Cell>
                      <Cell>{val.job}</Cell>
                      <Cell>{GetBeautifyDate(val.birthdate)}</Cell>
                      <Cell>
                        <CButton
                          label={'Show ' + (val.phone ? val.phone.length : 0)}
                          appearance='primary'
                          onClick={() => HandleOpenPhone(key)}
                        />
                      </Cell>
                      <Cell>
                        <CButton
                          label={'Show ' + (val.family ? val.family.length : 0)}
                          appearance='primary'
                          onClick={() => HandleOpenFamily(key)}
                        />
                      </Cell>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </CContent>
    </CContainer>
  )
}
