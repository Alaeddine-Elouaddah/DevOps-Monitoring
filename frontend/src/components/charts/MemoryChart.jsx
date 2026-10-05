import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const MemoryChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="flex h-full items-center justify-center text-gray-500">No data available</div>;
  }

  const formattedData = data.map(d => ({
    ...d,
    time: format(new Date(d.timestamp), 'HH:mm')
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', color: '#f9fafb', border: 'none', borderRadius: '4px' }}
          itemStyle={{ color: '#10b981' }}
          formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Memory Usage']}
        />
        <Area type="monotone" dataKey="memoryUsage" stroke="#10b981" fillOpacity={1} fill="url(#colorMemory)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MemoryChart;
