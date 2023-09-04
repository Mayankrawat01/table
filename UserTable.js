  import React, { useState, useEffect } from "react";
  import DeleteModal from './DeleteModal';
  import ParentComponent from './addUser';
  import EditUser from './EditUser'; 
  import "./UserTable.css";

  const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const[nextUserId,setNextUserId] = useState(11);

    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        console.error("Error");
        return [];
      }
      const data = await response.json();
      return data;
    };

    useEffect(() => {
      const fetchUserData = async () => {
        const userData = await fetchData();
        setUsers(userData);
      };
      fetchUserData();
    }, []);

    const handleLogout = () => {
      localStorage.clear();
      window.location.reload();
    };

    const openDeleteModal = (userId) => {
      setSelectedUserId(userId);
      setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
      setSelectedUserId(null);
      setDeleteModalOpen(false);
    };

    const deleteUser = () => {
      const updatedUsers = users.filter((user) => user.id !== selectedUserId);
      setUsers(updatedUsers);
      closeDeleteModal();
    };

    const openAddUserModal = () => {
      setAddUserModalOpen(true);
      // closeAddUserModal()
    };

    const closeAddUserModal = () => {
      setAddUserModalOpen(false);
    };
    const addUser = (newUser) => {
      const newUserWithId = {...newUser, id: nextUserId}
          setUsers((prevUsers) => [...prevUsers, newUserWithId]);
          setNextUserId(nextUserId + 1);
          closeAddUserModal();
        };
    const editUser = (userId) => {
      setEditingUserId(userId);
    };

    const saveEdit = (editedUserData) => {
      const updatedUsers = users.map((user) =>
        user.id === editedUserData.id ? { ...user, ...editedUserData } : user
      );
      setUsers(updatedUsers);
      setEditingUserId(null); 
    };

    const cancelEdit = () => {
      setEditingUserId(null); 
    };

    const utils = ['ID', 'Name', 'Email', 'City', 'Company Name'];

    return (
    <div className="user-table-container">
    <h2>User Table</h2>
  <table className="user-table">
  <thead>
  <tr>
  {utils.map((item) => <th key={item}>{item}</th>)}
  </tr>
  </thead>


  <tbody>



  {users.map((user) => (
  <React.Fragment key={user.id}>
    {editingUserId === user.id ? (
  <EditUser user={user} onSave={saveEdit} onCancel={cancelEdit} />
  ) : (
  <tr>
  <td> {user.id}</td>
  <td>{user.name}</td>
  <td>   {user.email}</td>
  <td> {user.address.city}</td>
  <td>{user.company.name}</td>
    <td>
    <button onClick={()=> editUser(user.id)}>Edit</button>
    <button onClick={()=> openDeleteModal(user.id)}>Delete</button>
  </td>
  </tr>
  )}
  </React.Fragment>
  ))}
  </tbody>
  </table>
  <button onClick={openAddUserModal}>Add New User</button>
  <button onClick={handleLogout}>Close</button>
  <DeleteModal isOpen={deleteModalOpen} onClose={closeDeleteModal} onDelete={deleteUser} />
  <ParentComponent isOpen={addUserModalOpen} onClose={closeAddUserModal} onAddUser={addUser} />
  </div>
  );
  };

  export default UserTable;
