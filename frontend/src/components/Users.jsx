import React, { useEffect, useState } from 'react';
import api from "../api.js";
import AddUserForm from './AddUserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const addUser = async (userName) => {
    try {
      await api.post('/users', { name: userName });
      fetchUsers();  // Refresh the list after adding a user
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
      <AddUserForm addUser={addUser} />
    </div>
  );
};

export default UserList;