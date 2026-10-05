import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const DiskChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="flex h-full items-center justify-center text-gray-500">No data available</div>;
  }

  const formattedData = data.map(d => ({
    ...d,
    time: format(new Date(d.timestamp), 'HH:mm')
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', color: '#f9fafb', border: 'none', borderRadius: '4px' }}
          itemStyle={{ color: '#f59e0b' }}
          formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Disk Usage']}
        />
        <Bar dataKey="diskUsage" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DiskChart;
