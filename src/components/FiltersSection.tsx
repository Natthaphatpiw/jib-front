'use client';

import { useState } from 'react';
import { Filter, Cpu, HardDrive, Monitor } from 'lucide-react';

interface FiltersSectionProps {
  onFilterChange: (filters: Record<string, unknown>) => void;
}

export default function FiltersSection({ onFilterChange }: FiltersSectionProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCPU, setSelectedCPU] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');

  const brands = ['Lenovo', 'ASUS', 'MSI', 'HP', 'Dell', 'Acer'];
  const cpuTypes = ['Intel', 'AMD'];
  const budgetOptions = [
    { label: 'ไม่เกิน 10,000', value: '0-10000' },
    { label: '10,000 - 20,000', value: '10000-20000' },
    { label: '20,000 - 30,000', value: '20000-30000' },
    { label: '30,000 - 50,000', value: '30000-50000' },
    { label: 'มากกว่า 50,000', value: '50000-999999' }
  ];

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    setSelectedBrands(newBrands);
    updateFilters(newBrands, selectedCPU, priceRange);
  };

  const handleCPUChange = (cpu: string) => {
    setSelectedCPU(cpu);
    updateFilters(selectedBrands, cpu, priceRange);
  };

  const handlePriceChange = (price: string) => {
    setPriceRange(price);
    updateFilters(selectedBrands, selectedCPU, price);
  };

  const updateFilters = (brands: string[], cpu: string, price: string) => {
    onFilterChange({
      brands,
      cpu,
      priceRange: price
    });
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCPU('');
    setPriceRange('');
    onFilterChange({
      brands: [],
      cpu: '',
      priceRange: ''
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="text-purple-600 mr-2" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">ตัวกรอง</h3>
        </div>
        <button 
          onClick={clearFilters}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          ล้างทั้งหมด
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Popular Brands */}
        <div>
          <div className="flex items-center mb-3">
            <Monitor className="text-blue-600 mr-2" size={16} />
            <h4 className="font-medium text-gray-700">แบรนด์ยอดนิยม</h4>
          </div>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                />
                <span className="text-sm text-gray-600">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* CPU Type */}
        <div>
          <div className="flex items-center mb-3">
            <Cpu className="text-green-600 mr-2" size={16} />
            <h4 className="font-medium text-gray-700">ประเภท CPU</h4>
          </div>
          <div className="space-y-2">
            {cpuTypes.map((cpu) => (
              <label key={cpu} className="flex items-center">
                <input
                  type="radio"
                  name="cpuType"
                  value={cpu}
                  checked={selectedCPU === cpu}
                  onChange={() => handleCPUChange(cpu)}
                  className="border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                />
                <span className="text-sm text-gray-600">{cpu}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget Options */}
        <div>
          <div className="flex items-center mb-3">
            <HardDrive className="text-orange-600 mr-2" size={16} />
            <h4 className="font-medium text-gray-700">ช่วงราคา</h4>
          </div>
          <div className="space-y-2">
            {budgetOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="budget"
                  value={option.value}
                  checked={priceRange === option.value}
                  onChange={() => handlePriceChange(option.value)}
                  className="border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                />
                <span className="text-sm text-gray-600">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedBrands.length > 0 || selectedCPU || priceRange) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-gray-700">ตัวกรองที่เลือก:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedBrands.map((brand) => (
              <span
                key={brand}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {brand}
                <button
                  onClick={() => handleBrandToggle(brand)}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}
            {selectedCPU && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {selectedCPU}
                <button
                  onClick={() => handleCPUChange('')}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {priceRange && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {budgetOptions.find(o => o.value === priceRange)?.label}
                <button
                  onClick={() => handlePriceChange('')}
                  className="ml-1 text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}