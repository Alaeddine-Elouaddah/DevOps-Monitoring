import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const ServerFilters = ({ filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({ ...filters, search: searchTerm, page: 0 });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onFilterChange, filters]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value, page: 0 });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search servers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>
      <div className="flex gap-4">
        <select
          name="environment"
          value={filters.environment || ''}
          onChange={handleSelectChange}
          className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        >
          <option value="">All Environments</option>
          <option value="DEVELOPMENT">Development</option>
          <option value="TEST">Test</option>
          <option value="STAGING">Staging</option>
          <option value="PRODUCTION">Production</option>
        </select>
        <select
          name="status"
          value={filters.status || ''}
          onChange={handleSelectChange}
          className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        >
          <option value="">All Statuses</option>
          <option value="ONLINE">Online</option>
          <option value="OFFLINE">Offline</option>
          <option value="WARNING">Warning</option>
        </select>
      </div>
    </div>
  );
};

export default ServerFilters;
