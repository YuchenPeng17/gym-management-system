import { useEffect, useState } from 'react';
import { getToken } from '@/services/auth';
import { baseURL } from '@/services/navigate';
import { useNavigate } from 'react-router';
import './Users.css';
export interface User {
    user_id: number;
    username: string;
    name: string;
    role: "admin" | "member";
}

export const Users = () => {
    // definition
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${baseURL}/api/users/list`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUsers(data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            {/* Tool Bar */}
            <div >
                <h1>Users Management</h1>
                    <button
                        type="button"
                        onClick={() => {
                            navigate('/register');
                        }}
                    >
                        Add User
                    </button>
            </div>

            {/* Users Table */}
            <div >
                <table >
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};