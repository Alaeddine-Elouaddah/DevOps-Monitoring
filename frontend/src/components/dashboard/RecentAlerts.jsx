import React from 'react';
import { format } from 'date-fns';
import SeverityBadge from '../common/SeverityBadge';

const RecentAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Alerts</h3>
        <p className="text-gray-500 dark:text-gray-400">No recent alerts.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Alerts</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 flex items-start gap-4">
            <SeverityBadge severity={alert.severity} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {alert.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Server: {alert.serverName} • {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAlerts;
