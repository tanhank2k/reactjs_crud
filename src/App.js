// App.js
import React, { useEffect, useState } from 'react';
import { getAllUsers, createUser, deleteUser, updateUser } from './services/UserService';

function App() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });
    const [editingUser, setEditingUser] = useState(null); // For tracking the user being edited

    useEffect(() => {
        getAllUsers().then(response => setUsers(response.data));
    }, []);

    // Create a new user
    const handleCreateUser = () => {
        createUser(newUser).then(response => {
            setUsers([...users, response.data]);
            setNewUser({ name: '', email: '', age: '' });
        });
    };

    // Delete a user
    const handleDeleteUser = (id) => {
        deleteUser(id).then(() => setUsers(users.filter(user => user.id !== id)));
    };

    // Set user to be edited
    const handleEditUser = (user) => {
        setEditingUser(user); // Load selected user into editing mode
    };

    // Save updated user details
    const handleUpdateUser = () => {
        updateUser(editingUser.id, editingUser).then(response => {
            setUsers(users.map(user => (user.id === response.data.id ? response.data : user)));
            setEditingUser(null); // Exit editing mode
        });
    };

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editingUser ? (
                <div>
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={editingUser.age}
                        onChange={(e) => setEditingUser({ ...editingUser, age: parseInt(e.target.value) })}
                    />
                    <button onClick={handleUpdateUser}>Save Changes</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h2>Add New User</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={newUser.age}
                        onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value) })}
                    />
                    <button onClick={handleCreateUser}>Add User</button>
                </div>
            )}
        </div>
    );
}

export default App;
