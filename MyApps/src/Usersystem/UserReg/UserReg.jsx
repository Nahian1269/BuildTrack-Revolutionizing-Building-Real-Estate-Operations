import { useState } from 'react';

const UserReg = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

 const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setLoading(true);

    try {
        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        let data = {};
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const text = await res.text();
            if (text.trim()) {
                data = JSON.parse(text);
            }
        }

        if (res.ok) {
            setMessage(data.message || 'Registration successful!');
            setForm({ username: '', email: '', password: '' });
        } else {
            setError(true);
            setMessage(data.message || 'Registration failed. Try again.');
        }
    } catch (err) {
        setError(true);
        setMessage('Registration failed. Server not responding.');
        console.error(err);
    }

    setLoading(false);
};


    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-purple-600">
            <nav className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
                <div className="text-xl font-bold text-blue-600">BuildTrack</div>
                <div className="space-x-6">
                    <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</a>
                    <a href="/forum" className="text-gray-700 hover:text-blue-600 font-medium transition">Forum</a>
                    <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About Us</a>
                </div>
            </nav>

            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
                    <div className="flex flex-col items-center mb-6">
                        <h1 className="text-3xl font-extrabold text-blue-600 mb-1" style={{ textShadow: '0 1px 2px #fff' }}>
                            BuildTrack
                        </h1>
                        <p className="text-gray-700 text-sm" style={{ textShadow: '0 1px 2px #fff' }}>
                            Revolutionizing Building & Real Estate Operations
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800" style={{ textShadow: '0 1px 2px #fff' }}>
                        Create Your BuildTrack Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                        />
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
                            type="submit"
                            disabled={loading}
                        >
                            {loading && (
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            )}
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    {message && (
                        <p className={`mt-4 text-center text-sm ${error ? 'text-red-600' : 'text-green-600'}`} style={{ fontWeight: 600, textShadow: '0 1px 2px #fff' }}>
                            {message}
                        </p>
                    )}

                    <div className="mt-6 text-center text-gray-700 text-xs" style={{ textShadow: '0 1px 2px #fff' }}>
                        Already have an account?{' '}
                        <a href="/Uselogin" className="text-blue-500 hover:underline">Login to BuildTrack</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReg;
