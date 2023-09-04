
import React, { useState } from 'react';

const EditUser = ({ user, onSave, onCancel }) => {
  const [editedUserData, setEditedUserData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevUserData) => {
      
      const keys = name.split('.');
      let newData = { ...prevUserData };

    
      let current = newData;
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          
          current[keys[i]] = value;
        } else {
          
          current = current[keys[i]];
        }
      }

      return newData;
    });
  };

  const saveEdit = () => {
    onSave(editedUserData);
  };

  return (
    <tr>
      <td>{user.id}</td>
      <td>
        <input
          type="text"
          name="name"
          value={editedUserData.name}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="email"
          value={editedUserData.email}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="address.City"
          value={editedUserData.address.city}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text" name="company.name" value={editedUserData.company.name} onChange={handleChange}
        />
      </td>
      <td>
        <button onClick={saveEdit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditUser;
