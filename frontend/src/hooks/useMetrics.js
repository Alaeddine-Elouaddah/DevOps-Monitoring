import { useState, useEffect, useCallback } from 'react';
import * as metricService from '../services/metricService';

export const useMetrics = (serverId, limit = 20) => {
  const [metrics, setMetrics] = useState([]);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = useCallback(async () => {
    if (!serverId) return;
    try {
      setLoading(true);
      const data = await metricService.getMetrics(serverId, limit);
      setMetrics(data || []);
      if (data && data.length > 0) {
        setLatest(data[data.length - 1]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [serverId, limit]);

  useEffect(() => {
    fetchMetrics();
    // Optional: could add polling here
  }, [fetchMetrics]);

  return { metrics, latest, loading, refetch: fetchMetrics };
};
