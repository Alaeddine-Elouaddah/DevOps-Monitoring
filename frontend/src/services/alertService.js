import api from './api';

export const getAlerts = async (params) => {
  const response = await api.get('/alerts', { params });
  return response.data;
};

export const resolveAlert = async (id) => {
  const response = await api.patch(`/alerts/${id}/resolve`);
  return response.data;
};

export const deleteAlert = async (id) => {
  const response = await api.delete(`/alerts/${id}`);
  return response.data;
};
