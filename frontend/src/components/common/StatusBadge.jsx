import React from 'react';

const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  let dotColor = 'bg-gray-500';

  if (status === 'ONLINE') {
    bgColor = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    dotColor = 'bg-green-500';
  } else if (status === 'OFFLINE') {
    bgColor = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    dotColor = 'bg-red-500';
  } else if (status === 'WARNING') {
    bgColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    dotColor = 'bg-yellow-500';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
      <span className={`w-2 h-2 mr-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

export default StatusBadge;
