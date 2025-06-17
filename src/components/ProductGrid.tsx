'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { Eye, Tag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  searchQuery?: string;
}

function HighlightedText({ text, searchQuery }: { text: string; searchQuery?: string }) {
  if (!searchQuery || !text) return <>{text}</>;

  const regex = new RegExp(`(${searchQuery})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <span key={index} className="bg-blue-100 text-blue-800 font-semibold px-1 rounded">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

function ProductCard({ product, searchQuery }: { product: Product; searchQuery?: string }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {product.category}
          </span>
        </div>
        {product.discount > 0 && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
              <Tag size={12} className="mr-1" />
              -{product.discount}%
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 min-h-[3rem]">
          <HighlightedText text={product.name} searchQuery={searchQuery} />
        </h3>

        <div className="text-sm text-gray-600 line-clamp-3 mb-4">
          <HighlightedText text={product.detail} searchQuery={searchQuery} />
        </div>
        
        <div className="text-xs text-gray-500 mb-2">
          {product.brand} | {product.warranty}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            {product.price !== product.sellprice && (
              <span className="text-sm text-gray-400 line-through">
                ฿{formatPrice(product.price)}
              </span>
            )}
            <div className="flex items-center text-xs text-gray-500">
              <Eye size={14} className="mr-1" />
              {formatViews(product.views)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">
              ฿{formatPrice(product.sellprice)}
            </div>
          </div>

          {product.discount > 0 && (
            <div className="text-sm text-green-600 font-medium">
              ประหยัด ฿{formatPrice(product.price - product.sellprice)}
            </div>
          )}
        </div>

        <a 
          href={product.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-center"
        >
          ดูรายละเอียด
        </a>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, isLoading, searchQuery }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบสินค้าที่ตรงกับการค้นหา</h3>
        <p className="text-gray-600">ลองใช้คำค้นหาอื่น หรือปรับเปลี่ยนเงื่อนไขการค้นหา</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          ผลการค้นหา ({products.length} รายการ)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  );
}