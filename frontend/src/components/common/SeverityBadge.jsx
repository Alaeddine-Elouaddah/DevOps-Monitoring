import React from 'react';

const SeverityBadge = ({ severity }) => {
  let colors = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';

  if (severity === 'CRITICAL') {
    colors = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  } else if (severity === 'WARNING') {
    colors = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors}`}>
      {severity}
    </span>
  );
};

export default SeverityBadge;
