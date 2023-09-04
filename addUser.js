
  
  import React, { useState } from 'react';
  import './addUser.css';
  const ParentComponent = ({ isOpen, onClose, onAddUser, nextUserId }) => {
    const [NewUser, setNewUser] = useState({
      id: nextUserId,
      name: '',
      email: '',
      address: { city: '' },
      company: { name: '' },
    });
    const handleChange = (e) => { 
      const { name, value } = e.target;
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
        ...(name === 'City' && { address: { ...prevUser.address, city: value } }),
        ...(name === 'companyName' && { company: { ...prevUser.address, name: value } }),
      }));
    };
    const addUserData = () => {
      if (NewUser) {
        onAddUser(NewUser);
        onClose();
      }
    };
    if (!isOpen) return null;
    return (
   <div className='centered-box'>
        <div className="container">
          <h2>Fill your details</h2>
          <label>Name: </label>
          <input type="text" name="name" value={NewUser.name} onChange={handleChange} />
          <label>Email: </label>
          <input type="text" name="email" value={NewUser.email} onChange={handleChange} />
          <label>City: </label>
          <input type="text" name="City" value={NewUser.address.city} onChange={handleChange} />
          <label>Company Name: </label>
          <input type="text" name="companyName" value={NewUser.company.name} onChange={handleChange} />
          <button onClick={addUserData}>Enter</button>
          <button onClick={onClose}>Cancel</button>
        </div>
        </div>
         );
  };
  
  export default ParentComponent;