import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as serverService from '../services/serverService';
import { useMetrics } from '../hooks/useMetrics';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CpuChart from '../components/charts/CpuChart';
import MemoryChart from '../components/charts/MemoryChart';
import DiskChart from '../components/charts/DiskChart';
import NetworkChart from '../components/charts/NetworkChart';

const ServerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);

  const { metrics, loading: metricsLoading } = useMetrics(id, 20);

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const data = await serverService.getServerById(id);
        setServer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServer();
  }, [id]);

  if (loading) return <div className="flex justify-center p-10"><LoadingSpinner size={40} /></div>;
  if (!server) return <div className="p-10 text-center text-gray-500">Server not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/servers')} className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
            {server.name}
            <StatusBadge status={server.status} />
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{server.hostname} • {server.ipAddress}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Server Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Environment</p>
            <p className="font-medium text-gray-900 dark:text-white">{server.environment}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">OS</p>
            <p className="font-medium text-gray-900 dark:text-white">{server.operatingSystem}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Created At</p>
            <p className="font-medium text-gray-900 dark:text-white">{new Date(server.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Updated At</p>
            <p className="font-medium text-gray-900 dark:text-white">{new Date(server.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Metrics Overview</h3>
      {metricsLoading ? (
        <div className="flex justify-center p-10"><LoadingSpinner /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-80">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">CPU Usage</h4>
            <CpuChart data={metrics} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-80">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Memory Usage</h4>
            <MemoryChart data={metrics} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-80">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Disk Usage</h4>
            <DiskChart data={metrics} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-80">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Network I/O</h4>
            <NetworkChart data={metrics} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerDetailPage;
