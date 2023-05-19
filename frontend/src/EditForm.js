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
    <div>
      <h2>Edit Visitydata</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="editName">Name:</label>
        <input type="text" id="editName" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="editEmail">Email:</label>
        <input type="email" id="editEmail" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="editMobile">Mobile No:</label>
        <input type="tel" id="editMobile" value={mobile} onChange={(e) => setMobile(e.target.value)} pattern="[0-9]{10}" />

        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditForm;
