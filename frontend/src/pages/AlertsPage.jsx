import React, { useState } from 'react';
import { useAlerts } from '../hooks/useAlerts';
import AlertTable from '../components/alerts/AlertTable';
import AlertFilters from '../components/alerts/AlertFilters';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ConfirmDialog from '../components/common/ConfirmDialog';
import * as alertService from '../services/alertService';
import { useNotification } from '../context/NotificationContext';

const AlertsPage = () => {
  const { alerts, pagination, loading, params, updateParams, refetch } = useAlerts({ page: 0, size: 10, sort: 'timestamp,desc' });
  const { addNotification } = useNotification();
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleResolve = async (id) => {
    try {
      await alertService.resolveAlert(id);
      addNotification('success', 'Alert marked as resolved');
      refetch();
    } catch (err) {
      addNotification('error', 'Failed to resolve alert');
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await alertService.deleteAlert(deletingId);
      addNotification('success', 'Alert deleted successfully');
      refetch();
    } catch (err) {
      addNotification('error', 'Failed to delete alert');
    } finally {
      setIsConfirmOpen(false);
      setDeletingId(null);
    }
  };

  const handlePageChange = (newPage) => {
    updateParams({ page: newPage });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Alerts</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <AlertFilters filters={params} onFilterChange={updateParams} />
        
        {loading ? (
          <div className="py-12 flex justify-center">
            <LoadingSpinner size={32} />
          </div>
        ) : (
          <>
            <AlertTable alerts={alerts} onResolve={handleResolve} onDelete={handleDeleteClick} />
            <Pagination currentPage={pagination.number} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Alert"
        message="Are you sure you want to delete this alert? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default AlertsPage;
