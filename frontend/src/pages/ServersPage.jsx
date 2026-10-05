import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useServers } from '../hooks/useServers';
import ServerTable from '../components/servers/ServerTable';
import ServerFilters from '../components/servers/ServerFilters';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ServerModal from '../components/servers/ServerModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import * as serverService from '../services/serverService';
import { useNotification } from '../context/NotificationContext';

const ServersPage = () => {
  const { servers, pagination, loading, params, updateParams, refetch } = useServers({ page: 0, size: 10 });
  const { addNotification } = useNotification();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServer, setEditingServer] = useState(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleAddClick = () => {
    setEditingServer(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (server) => {
    setEditingServer(server);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const handleSaveServer = async (serverData) => {
    try {
      if (editingServer) {
        await serverService.updateServer(editingServer.id, serverData);
        addNotification('success', 'Server updated successfully');
      } else {
        await serverService.createServer(serverData);
        addNotification('success', 'Server created successfully');
      }
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      addNotification('error', err.response?.data?.message || 'Failed to save server');
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await serverService.deleteServer(deletingId);
      addNotification('success', 'Server deleted successfully');
      refetch();
    } catch (err) {
      addNotification('error', 'Failed to delete server');
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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Servers</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Server
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <ServerFilters filters={params} onFilterChange={updateParams} />
        
        {loading ? (
          <div className="py-12 flex justify-center">
            <LoadingSpinner size={32} />
          </div>
        ) : (
          <>
            <ServerTable servers={servers} onEdit={handleEditClick} onDelete={handleDeleteClick} />
            <Pagination currentPage={pagination.number} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>

      <ServerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        server={editingServer}
        onSave={handleSaveServer}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Server"
        message="Are you sure you want to delete this server? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default ServersPage;
