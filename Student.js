import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1072')
      .then(res => {
       if (Array.isArray(res.data)) {
          setStudent(res.data);
        } else {
          console.error("Error: Response data is not an array");
        }
      })
      .catch(err => console.log(err));
  }, []);


  const handleDelete = async (id) => {
    try{
      await axios.delete('http://localhost:1072/student/'+id)
      window.location.reload()
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to="/create" className='btn btn-success'>Add +</Link>
        <table className='table'>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                <Link to={`/update/${data.id}`} className='btn btn-primary'>Update</Link>
                <button onClick={ e => handleDelete(data.id)} className="btn btn-danger ms-2" >Delete</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;