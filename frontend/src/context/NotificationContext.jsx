import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {notifications.map((n) => {
          let bgColor = 'bg-gray-800 text-white';
          if (n.type === 'success') bgColor = 'bg-green-600 text-white';
          if (n.type === 'error') bgColor = 'bg-red-600 text-white';
          if (n.type === 'warning') bgColor = 'bg-yellow-500 text-white';
          if (n.type === 'info') bgColor = 'bg-blue-600 text-white';

          return (
            <div key={n.id} className={`${bgColor} px-4 py-3 rounded shadow-lg flex items-center justify-between min-w-[250px] animate-slide-in`}>
              <span>{n.message}</span>
              <button onClick={() => removeNotification(n.id)} className="ml-4 text-white hover:text-gray-200 font-bold">×</button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
};
