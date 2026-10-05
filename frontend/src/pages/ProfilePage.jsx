import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-primary-600 h-32"></div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 p-1">
              <div className="w-full h-full rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-3xl font-bold text-primary-600 dark:text-primary-400">
                {initials}
              </div>
            </div>
            <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3" />
              {user.role}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {user.email}
          </p>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">First Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Member Since
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user.createdAt ? format(new Date(user.createdAt), 'MMMM d, yyyy') : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
