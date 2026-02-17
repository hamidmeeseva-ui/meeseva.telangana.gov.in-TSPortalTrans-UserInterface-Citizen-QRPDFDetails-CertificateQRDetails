import React from 'react'
import axiosInstance from '../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const handleLogout = async () => {

    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    await axiosInstance.post('/auth/logout');
    setIsAuthenticated(false);
    navigate('/login');
};

const Header = () => {
    return (
        <div className='pt-6 px-2'>
            <header className="flex justify-between items-center mb-4">
                <Link to={'/dashboard'}><h1 className="text-2xl font-bold">Dashboard</h1></Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </header>
        </div>
    )
}

export default Header
