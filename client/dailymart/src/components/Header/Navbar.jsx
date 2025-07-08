import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Website Name */}
      <div className="text-2xl font-bold text-blue-600">
        Dailymart
      </div>

      {/* Right Side - Cart & Login */}
      <div className="flex items-center space-x-6">
        {/* Cart with Image */}
        <a href="/cart" className="flex items-center text-gray-700 hover:text-blue-600">
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="Cart"
            className="w-5 h-5 mr-1"
          />
          Cart
        </a>

        {/* Login */}
        <a href="/login" className="flex items-center text-gray-700 hover:text-blue-600">
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
