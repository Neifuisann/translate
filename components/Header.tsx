import React from 'react';
import { MenuIcon, AppsIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-google-gray-border">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          <button className="p-2 text-google-text-gray hover:bg-gray-100 rounded-full">
            <MenuIcon />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-normal text-google-text-gray hidden sm:inline">Google</span>
            <span className="text-xl sm:text-2xl font-normal text-google-text-gray">Translate</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 text-google-text-gray hover:bg-gray-100 rounded-full hidden sm:block">
            <AppsIcon />
          </button>
          <button className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium">
            U
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;