import React from 'react';
import { Server, CheckCircle, XCircle, AlertTriangle, Bell, Cpu, MemoryStick, HardDrive } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import StatCard from '../components/dashboard/StatCard';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatPercent } from '../utils/formatters';

const DashboardPage = () => {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Servers" value={data.totalServers} icon={Server} color={{ bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-600 dark:text-blue-300' }} />
        <StatCard title="Online" value={data.onlineServers} icon={CheckCircle} color={{ bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-600 dark:text-green-300' }} />
        <StatCard title="Offline" value={data.offlineServers} icon={XCircle} color={{ bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-600 dark:text-red-300' }} />
        <StatCard title="Warnings" value={data.warningServers} icon={AlertTriangle} color={{ bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-600 dark:text-yellow-300' }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Avg CPU %" value={formatPercent(data.avgCpuUsage)} icon={Cpu} color={{ bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-600 dark:text-purple-300' }} />
        <StatCard title="Avg Memory %" value={formatPercent(data.avgMemoryUsage)} icon={MemoryStick} color={{ bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-600 dark:text-orange-300' }} />
        <StatCard title="Avg Disk %" value={formatPercent(data.avgDiskUsage)} icon={HardDrive} color={{ bg: 'bg-teal-100 dark:bg-teal-900', text: 'text-teal-600 dark:text-teal-300' }} />
        <StatCard title="Critical Alerts" value={data.criticalAlertsCount} icon={Bell} color={{ bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-600 dark:text-red-300' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Servers</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.recentServers?.map(server => (
              <div key={server.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{server.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{server.ipAddress} • {server.environment}</p>
                </div>
                <StatusBadge status={server.status} />
              </div>
            ))}
            {(!data.recentServers || data.recentServers.length === 0) && (
              <div className="p-4 text-gray-500 dark:text-gray-400">No servers found.</div>
            )}
          </div>
        </div>

        <RecentAlerts alerts={data.recentAlerts} />
      </div>
    </div>
  );
};

export default DashboardPage;
