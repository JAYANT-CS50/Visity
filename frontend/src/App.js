import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import EditForm from './EditForm';

function App() {
  const [visitydata, setVisitydata] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/visity/')
      .then(response => response.json())
      .then(data => {
        setVisitydata(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/visity/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Data deleted successfully');
          // Update the state by filtering out the deleted item
          setVisitydata(prevData => prevData.filter(item => item.id !== id));
        } else {
          throw new Error('Error deleting data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  

  const handleEdit = (id, updatedData) => {
    fetch(`http://127.0.0.1:8000/api/visity/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(responseData => {
        // Update the edited item in the visitydata state
        setVisitydata(prevData =>
          prevData.map(item => (item.id === id ? responseData : item))
        );
        setEditingId(null);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div>
      
        <UserForm />
      
      <div className="container-fluid">
        <br /><br /><br />
        <h4>Visitydata</h4>
        <table className="table table-striped" >
          <thead >
            <tr>
              <th scope="col" >Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitydata.map(item => (
              <tr key={item.id}  >
                <td>{item.name}</td>
                <td>{item.emailaddress}</td>
                <td>{item.mobileno}</td>
                <td>
                  <button onClick={() => setEditingId(item.id)} className="btn btn-warning" style={{ marginRight: '10px' }} >Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger"  >Delete</button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingId && (
          <EditForm
            visitydata={visitydata.find(item => item.id === editingId)}
            onEdit={handleEdit}
            onCancel={handleCancelEdit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
