import { useState, useEffect, useCallback } from 'react';
import * as alertService from '../services/alertService';
import { useNotification } from '../context/NotificationContext';

export const useAlerts = (initialParams = {}) => {
  const [alerts, setAlerts] = useState([]);
  const [pagination, setPagination] = useState({ totalElements: 0, totalPages: 0, number: 0, size: 10 });
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();
  const [params, setParams] = useState(initialParams);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await alertService.getAlerts(params);
      setAlerts(data.content || []);
      setPagination({
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        number: data.number,
        size: data.size
      });
    } catch (err) {
      addNotification('error', 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  }, [params, addNotification]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const updateParams = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return { alerts, pagination, loading, params, updateParams, refetch: fetchAlerts };
};
