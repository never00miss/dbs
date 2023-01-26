import React, { useCallback } from 'react'
import { CButton } from '../../Components/CButton'
import { CHeader } from '../../Components/CHeader'
import { CContent } from '../../Components/CContent'
import { CContainer } from '../../Components/CContainer'

import { toaster, Form, Schema, Message, IconButton } from 'rsuite'

import { CDatePicker } from '../../Components/CDatePicker'
import { CField } from '../../Components/CField'
import { useDispatch } from 'react-redux'
import { REDUX_REGISTER } from '../../Config/Reducer'
import { CText } from '../../Components/CText'

import { useNavigate } from 'react-router-dom'
import { PhoneInputControl } from './Components/phoneInput'
import { FamilyInputControl } from './Components/familyInput'

import ArowBackIcon from '@rsuite/icons/ArowBack'

const model = Schema.Model({
  name: Schema.Types.StringType()
    .isRequired('This field is required.')
    .pattern(/^[a-z ,.'-]+$/i),
  ektpNumber: Schema.Types.NumberType()
    .isRequired('This field is required.')
    .pattern(
      /^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/
    ),
  address: Schema.Types.StringType().isRequired('This field is required.'),
  job: Schema.Types.StringType()
    .isRequired('This field is required.')
    .pattern(/^[a-z ,.'-]+$/i),
  birthdate: Schema.Types.DateType().isRequired('This field is required.'),
  phone: Schema.Types.ArrayType()
    .isRequired('This field is required.')
    .of(
      Schema.Types.ObjectType()
        .isRequired('error!!')
        .shape({
          phoneNumber: Schema.Types.StringType()
            .isRequired('Required.')
            .pattern(/^(\+62|62|0)8[1-9][0-9]{6,9}$/)
        })
    ),
  family: Schema.Types.ArrayType()
    .isRequired('This field is required.')
    .of(
      Schema.Types.ObjectType()
        .isRequired('error!!')
        .shape({
          name: Schema.Types.StringType()
            .isRequired('Required.')
            .pattern(/^[a-z ,.'-]+$/i),
          birthdate: Schema.Types.DateType().isRequired(
            'This field is required.'
          ),
          relation: Schema.Types.StringType().isRequired(
            'This field is required.'
          )
        })
    )
})

export const RegisterScreen = props => {
  const formRef = React.useRef()

  const navigate = useNavigate()
  const [formError, setFormError] = React.useState([false])
  const [formValue, setFormValue] = React.useState({
    phone: [],
    family: [],
    name: '',
    ektpNumber: '',
    address: '',
    job: '',
    birthdate: new Date('1992-08-16'),
  })

  const dispatch = useDispatch()
  const onRegister = useCallback(() => {
    let _formValue = {
      ...formValue,
      birthdate: formValue.birthdate.toString()
    }

    dispatch({ type: REDUX_REGISTER, data: _formValue })[dispatch]
  })

  const HandleSubmit = () => {
    if (!formRef.current.check()) {
      toaster.push(<Message type='error'>Please fill required field</Message>)
      return
    }

    toaster.push(<Message type='success'>Success</Message>)
    onRegister(formValue)

    return navigate('/')
  }

  console.log('formerror', formError)

  return (
    <CContainer>
      <Form
        fluid
        model={model}
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
      >
        <CHeader>
          <div class='container'>
            <div class='row'>
              <div class='col-sm'>
                <IconButton
                  onClick={() => {
                    return navigate('/')
                  }}
                  icon={<ArowBackIcon />}
                />
              </div>
              <div class='col-sm pt-1 d-flex justify-content-center'>
                Tambah Member
              </div>
              <div class='col-sm d-flex align-items-end flex-column'>
                <CButton
                  label='Register'
                  appearance='primary'
                  type='submit'
                  onClick={HandleSubmit}
                />
              </div>
            </div>
          </div>
        </CHeader>
        <CContent>
          <div className='container p-2'>
            <div className='row'>
              <div className='col-sm'>
                <CField name='name' label='Nama' />
                <CField name='ektpNumber' label='Nomor e-KTP' />
                <CField name='address' label='Alamat' />
                <CField name='job' label='Pekerjaan' />
                <CField
                  name='birthdate'
                  label='Tanggal Lahir'
                  accepter={CDatePicker}
                />
              </div>
              <div className='col-sm'>
                <CField
                  name='phone'
                  label='No. Telpon'
                  fieldError={formError.phone}
                  accepter={PhoneInputControl}
                />
              </div>
            </div>
          </div>
        </CContent>
        <div className='bg-info p-2 mt-2 mb-2 text-white'>
          <CText>Tambah Keluarga</CText>
        </div>
        <div className='container p-2'>
          <CField
            name='family'
            fieldError={formError.family}
            accepter={FamilyInputControl}
          />
        </div>
      </Form>
    </CContainer>
  )
}
