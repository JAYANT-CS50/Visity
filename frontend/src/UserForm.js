import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('First Name is required').min(5, 'First Name should have at least 5 characters'),
  emailaddress: Yup.string().required('Email is required').email('Invalid email address'),
  mobileno: Yup.string().required('Mobile No is required').matches(/^\d{10}$/, 'Mobile No should have 10 digits'),
});

function UserForm() {
  const handleSubmit = (values, { setSubmitting }) => {
    // Send the data to your API endpoint
    fetch('http://127.0.0.1:8000/api/visity/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Data saved:', responseData);
        // Process the response data here if needed
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h1>User Data Form</h1>
      <Formik
        initialValues={{ name: '', emailaddress: '', mobileno: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">First Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="emailaddress">Email:</label>
              <Field type="emailaddress" id="emailaddress" name="emailaddress" />
              <ErrorMessage name="emailaddress" component="div" />
            </div>

            <div>
              <label htmlFor="mobileno">Mobile No:</label>
              <Field type="tel" id="mobileno" name="mobileno" />
              <ErrorMessage name="mobileno" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default UserForm;
