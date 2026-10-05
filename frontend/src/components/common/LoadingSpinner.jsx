import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 24, className = '' }) => {
  return (
    <Loader2 size={size} className={`animate-spin text-primary-500 ${className}`} />
  );
};

export default LoadingSpinner;
