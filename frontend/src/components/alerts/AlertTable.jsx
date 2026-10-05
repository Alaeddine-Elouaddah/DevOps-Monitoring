import React from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';
import SeverityBadge from '../common/SeverityBadge';

const AlertTable = ({ alerts, onResolve, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Severity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Server</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
          {alerts.map((alert) => (
            <tr key={alert.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${alert.severity === 'CRITICAL' && !alert.resolved ? 'bg-red-50/30 dark:bg-red-900/10' : ''}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <SeverityBadge severity={alert.severity} />
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 dark:text-white font-medium">{alert.type}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{alert.message}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{alert.serverName || `ID: ${alert.serverId}`}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {alert.resolved ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Resolved
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    Unresolved
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(alert.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {!alert.resolved && (
                  <button onClick={() => onResolve(alert.id)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mx-2" title="Resolve">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => onDelete(alert.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mx-2" title="Delete">
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
          {alerts.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No alerts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
