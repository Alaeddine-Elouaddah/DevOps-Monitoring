import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const CpuChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="flex h-full items-center justify-center text-gray-500">No data available</div>;
  }

  const formattedData = data.map(d => ({
    ...d,
    time: format(new Date(d.timestamp), 'HH:mm')
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', color: '#f9fafb', border: 'none', borderRadius: '4px' }}
          itemStyle={{ color: '#3b82f6' }}
          formatter={(value) => [`${Number(value).toFixed(1)}%`, 'CPU Usage']}
        />
        <Line type="monotone" dataKey="cpuUsage" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CpuChart;
