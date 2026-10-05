import api from './api';

export const getMetrics = async (serverId, limit = 20) => {
  const response = await api.get(`/servers/${serverId}/metrics`, { params: { limit } });
  return response.data;
};

export const getLatestMetric = async (serverId) => {
  const response = await api.get(`/servers/${serverId}/metrics/latest`);
  return response.data;
};
