import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: ''
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    if (id) {
      axios.put(`http://localhost:1072/update/${id}`, values)
        .then(res => {
          console.log(res);
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
          <h2>Update Student</h2>
          <div className='mb-2'>
            <label htmlFor=''>Name</label>
            <input
              type='text'
              placeholder='Enter Name'
              className='form-control'
              value={values.name}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Email</label>
            <input
              type='text'
              placeholder='Enter Email'
              className='form-control'
              value={values.email}
              onChange={e => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
