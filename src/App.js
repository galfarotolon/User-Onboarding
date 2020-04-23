import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form'
import axios from 'axios'
import * as yup from 'yup'

// 👉 the URL for our [GET] and [POST] requests
const url = 'https://reqres.in/api/users'

// 👉 the shape of the state that drives the form
const initialFormValues = {
  ///// TEXT INPUTS /////
  name: '',
  email: '',
  ///// DROPDOWN /////
  password: '',
  ///// CHECKBOXES /////
  termsOfService: false,

}

// 👉 the shape of the validation errors object
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  termsOfService: false,


}

// 🔥 STEP 7 - WE NEED TO BUILD A SCHEMA FOR VALIDATION
const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required!'),
  email: yup
    .string()
    .email('a VALID email is required')
    .required('Email is required!'),
  password: yup
    .string()
    .required('Password is required!'),
  termsOfService: yup
    .boolean()
    .required("You must agree!!")
    .oneOf([true], "You must agree to the Terms of Service!")


})

export default function App() {


  const [users, setUsers] = useState([])

  const [formValues, setFormValues] = useState(initialFormValues)

  // 🔥 STEP 1 - WE NEED STATE TO KEEP TRACK OF WHETHER SUBMIT BUTTON IS DISABLED!
  const [formDisabled, setFormDisabled] = useState(true)

  // 🔥 STEP 2 - WE NEED STATE TO KEEP TRACK OF THE VALIDATION ERRORS!
  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const getUser = () => {
    // 🔥 STEP 3 - WE NEED TO FETCH FRIENDS FROM THE API!
    // and set them in state
    axios.get(url)
      .then(res => {

        console.log(res.data.data)

        setUsers(res.data.data)

      })
      .catch(err => {
        console.log("error!")
      })
  }

  useEffect(() => {
    getUser()
  }, [])


  const postUser = user => { // minus id
    // 🔥 STEP 5 - WE NEED A FUNCTION TO POST A NEW FRIEND TO THE API!
    // and set the updated list of friends in state
    // the endpoint responds (on success) with the new friend (with id !!)
    axios.post(url, user)
      .then(res => {
        setUsers([...users, res.data])
        // setUsers(res.data)
        // console.log(users)

      })
      .catch(err => {
        console.log(err)

      })

  }


  useEffect(() => {

    formSchema.isValid(formValues)
      .then(valid => { // either true or false
        setFormDisabled(!valid)
      })
  }, [formValues])

  const onSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      termsOfService: formValues.termsOfService

    }


    postUser(newUser)
    setFormValues(initialFormValues)
  }

  const onInputChange = evt => {

    const name = evt.target.name
    const value = evt.target.value


    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {

        setFormErrors({
          ...formErrors,
          [name]: "",

        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })


    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const onCheckboxChange = evt => {
    const name = evt.target.name
    const isChecked = evt.target.checked


    yup
      .reach(formSchema, name)
      .validate(isChecked)
      .then(valid => {
        //happy path
        //CLEAR ERROR
        setFormErrors({
          ...formErrors,
          [name]: "",

        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.message
        })
      })

    setFormValues({
      ...formValues,
      [name]: isChecked,
    })
  }

  return (
    <div className="App">

      <h1>Friend Form</h1>

      <Form
        values={formValues}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}

        disabled={formDisabled}
        errors={formErrors}
      />


      {
        users.map(user => {
          return (
            <pre>{JSON.stringify(user, null, 2)}</pre>
          )
        })
      }

    </div>
  );
}


