'use client';

import { useState, useRef } from 'react';
import { Search } from 'lucide-react';

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  suggestions: string[];
}

export default function SearchInterface({ onSearch, isLoading, suggestions }: SearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center bg-white rounded-lg shadow-lg border transition-all duration-200 ${
          isFocused ? 'bg-[#F2F3FF] border-blue-500 shadow-xl' : 'border-gray-200'
        }`}>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="ค้นหาสินค้า เช่น โน้ตบุ๊คแรงๆ งบ 25,000 หรือ การ์ดจอ RTX"
              className="w-full px-6 py-4 text-lg bg-transparent border-none outline-none placeholder-gray-400 text-black"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center pr-2">
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={`flex items-center justify-center px-6 py-3 rounded-md text-white font-medium transition-all ${
                isLoading || !query.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <Search size={20} />
              )}
            </button>
          </div>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-64 overflow-y-auto">
          <div className="p-2">
            <div className="text-sm text-gray-500 px-3 py-2">คำแนะนำการค้นหา</div>
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="flex items-center">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-700">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}