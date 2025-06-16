'use client';

import { ShoppingCart, Heart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                JIB
              </div>
              <span className="ml-2 text-gray-600 font-medium">Computer Shop</span>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Heart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}