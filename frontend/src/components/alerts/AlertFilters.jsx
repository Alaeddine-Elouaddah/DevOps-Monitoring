import React from 'react';

const AlertFilters = ({ filters, onFilterChange }) => {
  const severities = ['ALL', 'CRITICAL', 'WARNING', 'INFO'];
  const statuses = [
    { label: 'All Status', value: '' },
    { label: 'Resolved', value: 'true' },
    { label: 'Unresolved', value: 'false' }
  ];

  const handleSeverityClick = (severity) => {
    onFilterChange({ ...filters, severity: severity === 'ALL' ? '' : severity, page: 0 });
  };

  const handleStatusClick = (statusValue) => {
    onFilterChange({ ...filters, resolved: statusValue, page: 0 });
  };

  const currentSeverity = filters.severity || 'ALL';

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full sm:w-auto">
        {severities.map(sev => (
          <button
            key={sev}
            onClick={() => handleSeverityClick(sev)}
            className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentSeverity === sev 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full sm:w-auto">
        {statuses.map(status => (
          <button
            key={status.label}
            onClick={() => handleStatusClick(status.value)}
            className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              (filters.resolved || '') === status.value
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlertFilters;
