// pages/index.js
'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import UserForm from '../src/components/UserForm';
import UserTile from '../src/tiles/UserTile';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    axios.get('http://localhost:8081/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleSubmit = async () => {
    if (editingUser) {
      const response = await axios.put(`http://localhost:8081/users/${editingUser.id}`, { name, email });
      setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
      setEditingUser(null);
    } else {
      const response = await axios.post('http://localhost:8081/users', { name, email });
      setUsers([...users, response.data]);
    }
    setName('');
    setEmail('');
  };

  const startEditing = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:8081/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <header className="bg-blue-500 text-white p-4 rounded">
        <h1 className="text-3xl font-bold text-center">CRUD 게시판</h1>
      </header>
      <section className="mt-10 flex justify-center">
        <UserForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
          editingUser={!!editingUser}
        />
      </section>
      <section className="mt-10 bg-gray-200 p-4 rounded">
        {users.map(user => (
          <UserTile
            key={user.id}
            user={user}
            startEditing={startEditing}
            deleteUser={deleteUser}
          />
        ))}
      </section>
    </div>
  );
}