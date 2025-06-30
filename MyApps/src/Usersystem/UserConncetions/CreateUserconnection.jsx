import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateUserconnection = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error('Error fetching users:', err))
            .finally(() => setLoading(false));
    }, []);

    const openWhatsApp = (phoneNumber) => {
        const url = `https://wa.me/${phoneNumber}`;
        window.open(url, '_blank');
    };

    const viewProfile = (userId) => {
        window.location.href = `/profile/${userId}`;
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6 tracking-tight drop-shadow">
                    User Connections
                </h1>
                <div className="mb-6 flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />
                    <span className="text-green-600 font-semibold">{filteredUsers.length} found</span>
                </div>
                {loading ? (
                    <div className="text-center text-green-500 font-semibold py-8 animate-pulse">
                        Loading users...
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No users found.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredUsers.map(user => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between bg-gradient-to-r from-green-100 via-white to-blue-100 p-4 rounded-xl shadow hover:scale-[1.02] transition-transform"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full border-2 border-green-400 shadow"
                                    />
                                    <div>
                                        <button
                                            className="text-lg font-bold text-blue-700 hover:underline"
                                            onClick={() => viewProfile(user.id)}
                                        >
                                            {user.name}
                                        </button>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openWhatsApp(user.phone)}
                                        className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                                        title="Message on WhatsApp"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 6.01L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.67.96.98-3.58-.25-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.98 2.43.02 1.43 1.03 2.82 1.18 3.02.15.2 2.03 3.1 4.92 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
                                        </svg>
                                        WhatsApp
                                    </button>
                                    <button
                                        onClick={() => viewProfile(user.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                                        title="View Profile"
                                    >
                                        Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateUserconnection;
