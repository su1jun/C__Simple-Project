// components/UserTile.tsx
import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserTileProps {
  user: User;
  startEditing: (user: User) => void;
  deleteUser: (id: number) => void;
}

const UserTile: React.FC<UserTileProps> = ({ user, startEditing, deleteUser }) => {
    return (
        <div className="flex justify-center items-center p-4 border-b border-gray-300 bg-white rounded shadow-md mb-2
        max-w-md w-full mx-auto 2xl:max-w-2xl 2xl:mx-auto">
        <span className="mr-4 text-center">{user.id}</span>
        <span className="w-56 text-center">{user.name}</span>
        <span className="w-56 text-center">{user.email}</span>
        <div className="flex space-x-2">
        <button
          onClick={() => startEditing(user)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          Edit
        </button>
        <button
          onClick={() => deleteUser(user.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
        </div>
      </div>
    );
  };

export default UserTile;
