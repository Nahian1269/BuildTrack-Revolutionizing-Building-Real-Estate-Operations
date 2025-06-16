import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Logmain = () => {
 const [username, setUsername] = useState('');
  const [role, setRole] = useState('User');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
        role
      }, {
        withCredentials: true 
      });
      if (response.data && response.data.success) {
        navigate('/User');
      } else {
        alert(response.data && response.data.message ? response.data.message : "Login failed.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else if (err.message) {
        alert("Network/server error: " + err.message);
      } else {
        alert("An error occurred during login. Please check your network or server.");
      }
      console.error(err);
    }
  };

  return (
    <div className=" flex  justify-center">
      <div className="bg-[#928CFF] p-8 rounded-3xl w-100 h-120">
        <div className="flex mb-6 bg-white rounded-full w-fit px-1 py-1">
          <button className="bg-[#928CFF] text-white px-4 py-1 rounded-full font-semibold text-sm">
            Log In
          </button>
          <button className="text-gray-400 px-4 py-1 rounded-full font-semibold text-sm">
            Sign in
          </button>
        </div>

        <h2 className="text-center text-white font-bold mb-6">LOG IN</h2>

        <form onSubmit={handleLogin}>
          <label className="text-white text-sm block mb-1">
            Username or email
          </label>
          <div className="relative mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 text-sm pr-2 pl-1 py-1 rounded-full z-10"
            >
              <option>User</option>
              <option>Admin</option>
              <option>Guest</option>
            </select>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username or email"
              className="w-full pl-24 pr-4 py-2 rounded-full bg-white text-gray-800"
            />
          </div>

          <label className="text-white text-sm block mb-1">Password</label>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white"
            />
          </div>

          <div className="text-center text-white text-sm mb-4">
            <a href="#" className="hover:underline">
              Forgotten Password
            </a>
          </div>

          <div className="text-center">
            <NavLink to='/User'>
              <button
                type="submit"
                className="bg-white text-black font-semibold px-6 py-2 rounded-full"
              >
                Log in
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Logmain;
