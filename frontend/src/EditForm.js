import React, { useState } from 'react';

function EditForm({ visitydata, onEdit, onCancel }) {
  const [name, setName] = useState(visitydata.name);
  const [email, setEmail] = useState(visitydata.emailaddress);
  const [mobile, setMobile] = useState(visitydata.mobileno);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      name: name,
      emailaddress: email,
      mobileno: mobile
    };
    onEdit(visitydata.id, updatedData);
  };

  return (
    <div className="container-fluid" >
      <br /><br />
      <h4>Edit Data</h4>
        <form onSubmit={handleSubmit} className="row g-3" >

          <div className="col-md-4" >
            <label htmlFor="editName" className="form-label" >Name:</label>
            <input type="text" id="editName" value={name} onChange={(e) => setName(e.target.value)}  className="form-control" />
          </div>

          <div className="col-md-4" >
            <label htmlFor="editEmail" className="form-label">Email:</label>
            <input type="email" id="editEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
          </div>

          <div className="col-md-4" >
            <label htmlFor="editMobile" className="form-label" >Mobile No:</label>
            <input type="tel" id="editMobile" value={mobile} onChange={(e) => setMobile(e.target.value)} pattern="[0-9]{10}"  className="form-control" />
          </div>

          <div  className="col-12" >
            <button type="submit" className="btn btn-success" style={{ marginRight: '10px' }} >Save</button>
            <button type="button" onClick={onCancel} className="btn btn-primary" >Cancel</button>
          </div>

        </form>
    </div>
  );
}

export default EditForm;
