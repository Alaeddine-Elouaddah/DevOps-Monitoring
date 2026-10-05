import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';

const NetworkChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="flex h-full items-center justify-center text-gray-500">No data available</div>;
  }

  const formattedData = data.map(d => ({
    ...d,
    time: format(new Date(d.timestamp), 'HH:mm'),
    netIn: Number(d.networkIn) / 1024 / 1024, // Convert to MB
    netOut: Number(d.networkOut) / 1024 / 1024, // Convert to MB
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}MB`} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', color: '#f9fafb', border: 'none', borderRadius: '4px' }}
          formatter={(value, name) => [`${Number(value).toFixed(2)} MB/s`, name === 'netIn' ? 'Network In' : 'Network Out']}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Line type="monotone" dataKey="netIn" name="Network In" stroke="#3b82f6" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="netOut" name="Network Out" stroke="#10b981" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NetworkChart;
