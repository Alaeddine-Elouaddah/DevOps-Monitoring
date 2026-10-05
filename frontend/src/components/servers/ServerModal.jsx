import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

const ServerModal = ({ isOpen, onClose, server, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    hostname: '',
    ipAddress: '',
    operatingSystem: '',
    environment: 'DEVELOPMENT',
    status: 'ONLINE'
  });

  useEffect(() => {
    if (server) {
      setFormData({
        name: server.name || '',
        hostname: server.hostname || '',
        ipAddress: server.ipAddress || '',
        operatingSystem: server.operatingSystem || '',
        environment: server.environment || 'DEVELOPMENT',
        status: server.status || 'ONLINE'
      });
    } else {
      setFormData({
        name: '',
        hostname: '',
        ipAddress: '',
        operatingSystem: '',
        environment: 'DEVELOPMENT',
        status: 'ONLINE'
      });
    }
  }, [server, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={server ? 'Edit Server' : 'Add Server'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hostname</label>
          <input required type="text" name="hostname" value={formData.hostname} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">IP Address</label>
          <input required type="text" name="ipAddress" value={formData.ipAddress} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Operating System</label>
          <input required type="text" name="operatingSystem" value={formData.operatingSystem} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Environment</label>
            <select name="environment" value={formData.environment} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm">
              <option value="DEVELOPMENT">Development</option>
              <option value="TEST">Test</option>
              <option value="STAGING">Staging</option>
              <option value="PRODUCTION">Production</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm">
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
              <option value="WARNING">Warning</option>
            </select>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Save</button>
        </div>
      </form>
    </Modal>
  );
};

export default ServerModal;
