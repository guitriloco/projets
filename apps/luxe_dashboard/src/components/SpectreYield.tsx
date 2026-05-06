"use client";
import React, { useState, useEffect } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, Line, Bar 
} from "recharts";
import { fetchYieldHistory } from "@/lib/api";

export const SpectreYield = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const updateYield = async () => {
      try {
        const history = await fetchYieldHistory();
        
        // Group data by timestamp to align regional reports
        const grouped: any = {};
        history.forEach((h: any) => {
          const time = new Date(h.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          if (!grouped[time]) {
            grouped[time] = { time, ALPHA: 0, BETA: 0, GAMMA: 0, GLOBAL: 0, TOTAL: 0 };
          }
          grouped[time][h.region] = h.yield_roi * 5;
          if (h.region !== 'GLOBAL') {
            grouped[time].TOTAL += h.yield_roi * 5;
          }
        });
        
        setData(Object.values(grouped));
      } catch (e) {
        console.error("Failed to fetch yield history", e);
      }
    };

    updateYield();
    const interval = setInterval(updateYield, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-morphism p-8 rounded-none border-zinc-900/50 h-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-white mb-1">
            SPECTRE_YIELD Analysis
          </h2>
          <p className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase">
            Predictive vs. Actual Performance
          </p>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#18181B" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#52525B" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#52525B' }}
            />
            <YAxis 
              stroke="#52525B" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#52525B' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#09090B', 
                border: '1px solid #18181B',
                fontSize: '10px',
                fontFamily: 'monospace',
                color: '#D4AF37'
              }}
              itemStyle={{ color: '#D4AF37' }}
            />
            <Area 
              type="monotone" 
              dataKey="TOTAL" 
              stroke="#D4AF37" 
              fillOpacity={1} 
              fill="url(#yieldGradient)" 
              strokeWidth={3}
              name="TRINITY TOTAL"
            />
            <Line 
              type="monotone" 
              dataKey="ALPHA" 
              stroke="#3B82F6" 
              dot={false}
              strokeWidth={1}
              name="ALPHA CLUSTER"
            />
            <Line 
              type="monotone" 
              dataKey="BETA" 
              stroke="#10B981" 
              dot={false}
              strokeWidth={1}
              name="BETA CLUSTER"
            />
            <Line 
              type="monotone" 
              dataKey="GAMMA" 
              stroke="#8B5CF6" 
              dot={false}
              strokeWidth={1}
              name="GAMMA CLUSTER"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
