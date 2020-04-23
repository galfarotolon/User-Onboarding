import React from "react"



function Form(props) {

    const {
        values,
        onInputChange,
        onCheckboxChange,
        onSubmit,
        disabled,
        errors,
    } = props




    return (
        <form autoComplete="off" >
            <h2>User Form</h2>
            {/* 🔥 STEP 10 - SHOW A BUNCH OF ERRORS */}
            <div className="error">
                <div className="errorMessage">{errors.name}</div>
                <div className="errorMessage">{errors.email}</div>
                <div className="errorMessage">{errors.password}</div>
                <div className="errorMessage">{errors.termsOfService}</div>
            </div>
            {/* ////////// TEXT INPUTS ////////// */}
            <label autoComplete="off">Name:&nbsp;
          <input
                    value={values.name}
                    onChange={onInputChange}
                    name='name'
                    type='text'
                /></label>
            <label>Email:&nbsp;
          <input
                    value={values.email}
                    onChange={onInputChange}
                    name='email'
                    type='text'
                /></label>

            {/* ////////// PASSWORD////////// */}
            <label>Password:&nbsp;
          <input
                    value={values.password}
                    onChange={onInputChange}
                    name='password'
                    type="password"


                /></label>

            {/* ////////// CHECKBOXES ////////// */}
            <label><input
                checked={values.termsOfService}
                onChange={onCheckboxChange}
                name='termsOfService'
                type="checkbox" /> I Agree to the Terms of Service</label>


            {/* ////////// SUBMIT WITH DISABLE UNTIL NOT FILLED////////// */}
            <button onClick={onSubmit} disabled={disabled}>submit</button>
        </form>
    )
}

export default Form;