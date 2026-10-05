import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatPercent } from '../../utils/formatters';

const ServerTable = ({ servers, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">IP / OS</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Environment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Resources</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
          {servers.map((server) => (
            <tr key={server.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{server.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{server.hostname}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{server.ipAddress}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{server.operatingSystem}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  {server.environment}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={server.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full max-w-[120px]">
                  <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
                    <span>CPU</span>
                    <span>{server.latestMetrics ? formatPercent(server.latestMetrics.cpuUsage) : '--'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mb-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${server.latestMetrics?.cpuUsage || 0}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
                    <span>RAM</span>
                    <span>{server.latestMetrics ? formatPercent(server.latestMetrics.memoryUsage) : '--'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${server.latestMetrics?.memoryUsage || 0}%` }}></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => navigate(`/servers/${server.id}`)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mx-2" title="View Details">
                  <Eye className="w-4 h-4" />
                </button>
                <button onClick={() => onEdit(server)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mx-2" title="Edit">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(server.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mx-2" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {servers.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No servers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServerTable;
