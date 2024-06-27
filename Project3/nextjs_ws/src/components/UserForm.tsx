// components/UserForm.tsx
import React from 'react';

interface UserFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: () => void;
  editingUser: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ name, setName, email, setEmail, handleSubmit, editingUser }) => {
  return (
    <div className="flex justify-center items-center mt-10 bg-gray-100 p-4 rounded">
      <div className="flex space-x-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded w-56"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded w-56"
        />
        <button
          onClick={handleSubmit}
          className="px-10 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {editingUser ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};
export default UserForm;
