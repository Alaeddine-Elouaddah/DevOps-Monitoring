import api from './api';

export const getServers = async (params) => {
  const response = await api.get('/servers', { params });
  return response.data;
};

export const getServerById = async (id) => {
  const response = await api.get(`/servers/${id}`);
  return response.data;
};

export const createServer = async (data) => {
  const response = await api.post('/servers', data);
  return response.data;
};

export const updateServer = async (id, data) => {
  const response = await api.put(`/servers/${id}`, data);
  return response.data;
};

export const deleteServer = async (id) => {
  const response = await api.delete(`/servers/${id}`);
  return response.data;
};
