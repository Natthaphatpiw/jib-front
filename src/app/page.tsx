'use client';

import { useState } from 'react';
import SearchInterface from '@/components/SearchInterface';
import ProductGrid from '@/components/ProductGrid';
import { SearchResponse } from '@/types';
import dotenv from 'dotenv';

dotenv.config();
const apiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setCurrentQuery(query);
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl || 'http://localhost:8000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          llm_provider: 'openai',
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: SearchResponse = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({
        products: [],
        suggestions: [],
        ranking_explanation: 'เกิดข้อผิดพลาดในการค้นหา',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            JIB Computer Shop
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Smart Search
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <SearchInterface 
            onSearch={handleSearch}
            isLoading={isLoading}
            suggestions={searchResults?.suggestions || []}
          />

          {searchResults && (
            <div className="mt-8">
              {searchResults.ranking_explanation && (
                <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <p className="text-gray-700">{searchResults.ranking_explanation}</p>
                </div>
              )}

              <ProductGrid 
                products={searchResults.products}
                isLoading={isLoading}
                searchQuery={currentQuery}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}