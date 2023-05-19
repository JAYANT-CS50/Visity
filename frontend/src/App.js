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
      <h1>Your App</h1>
      <UserForm />

      <div>
        <h1>Visitydata</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitydata.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.emailaddress}</td>
                <td>{item.mobileno}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <button onClick={() => setEditingId(item.id)}>Edit</button>
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
