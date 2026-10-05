import { useState, useEffect, useCallback } from 'react';
import * as serverService from '../services/serverService';
import { useNotification } from '../context/NotificationContext';

export const useServers = (initialParams = {}) => {
  const [servers, setServers] = useState([]);
  const [pagination, setPagination] = useState({ totalElements: 0, totalPages: 0, number: 0, size: 10 });
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();
  const [params, setParams] = useState(initialParams);

  const fetchServers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await serverService.getServers(params);
      setServers(data.content || []);
      setPagination({
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        number: data.number,
        size: data.size
      });
    } catch (err) {
      addNotification('error', 'Failed to fetch servers');
    } finally {
      setLoading(false);
    }
  }, [params, addNotification]);

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  const updateParams = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return { servers, pagination, loading, params, updateParams, refetch: fetchServers };
};
