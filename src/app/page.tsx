'use client';

import { useState } from 'react';
import SearchInterface from '@/components/SearchInterface';
import ProductGrid from '@/components/ProductGrid';
import { SearchResponse, RecommendationItem } from '@/types';

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setCurrentQuery(query);
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
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
        explanation: 'เกิดข้อผิดพลาดในการค้นหา',
        total_found: 0,
        recommendations: [],
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
            ค้นหาสินค้าด้วย AI แบบอัจฉริยะ
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <SearchInterface 
            onSearch={handleSearch}
            isLoading={isLoading}
            suggestions={[]}
          />

          {searchResults && (
            <div className="mt-8">
              {searchResults.explanation && (
                <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">ผลการค้นหา</h3>
                  <p className="text-gray-700">{searchResults.explanation}</p>
                  <p className="text-sm text-gray-500 mt-2">พบ {searchResults.total_found} รายการ</p>
                </div>
              )}
              
              {searchResults.recommendations && searchResults.recommendations.length > 0 && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-3">สินค้าที่แนะนำ</h3>
                  <div className="space-y-2">
                    {searchResults.recommendations.slice(0, 3).map((rec: RecommendationItem) => (
                      <div key={rec.product_id} className="text-sm">
                        <span className="font-medium text-green-800">อันดับ {rec.rank}:</span>
                        <span className="text-green-700 ml-2">{rec.reasons.join(', ')}</span>
                      </div>
                    ))}
                  </div>
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