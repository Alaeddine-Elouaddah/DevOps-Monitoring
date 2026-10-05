export const formatDate = (dateString) => {
  if (!dateString) return '--';
  const date = new Date(dateString);
  return date.toLocaleString();
};

export const formatPercent = (value) => {
  if (value == null) return '--';
  return `${Number(value).toFixed(1)}%`;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  if (!bytes) return '--';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'ONLINE': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'OFFLINE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'WARNING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};
