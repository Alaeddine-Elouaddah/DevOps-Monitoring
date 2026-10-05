import { useState, useEffect, useCallback } from 'react';
import * as dashboardService from '../services/dashboardService';
import { useNotification } from '../context/NotificationContext';

export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addNotification } = useNotification();

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const summary = await dashboardService.getSummary();
      setData(summary);
      setError(null);
    } catch (err) {
      setError(err);
      addNotification('error', 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, refetch: fetchDashboard };
};
