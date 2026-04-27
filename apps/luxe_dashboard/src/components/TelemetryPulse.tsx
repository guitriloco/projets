"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap } from "lucide-react";

export const TelemetryPulse = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch("http://localhost:8000/telemetry/recent");
        if (response.ok) {
          const data = await response.json();
          setLogs(data.reverse().slice(0, 15));
        }
      } catch (e) {
        console.error("Failed to fetch telemetry", e);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-morphism p-8 rounded-none border-zinc-900/50 h-full overflow-hidden">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-white mb-1">
            Sensory Pulse
          </h2>
          <p className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase">
            Auto binary telemetry stream
          </p>
        </div>
        <Activity className="w-4 h-4 text-luxe-gold animate-pulse" />
      </div>

      <div className="space-y-2 h-[200px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={log.timestamp + i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between items-center py-2 border-b border-zinc-900/50 last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-1 h-1 rounded-full ${log.rating >= 4 ? 'bg-luxe-gold' : 'bg-luxe-ruby'}`} />
                <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-tighter">
                  {log.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-[9px] font-mono text-zinc-600 italic truncate max-w-[150px]">
                  {log.notes}
                </span>
                <span className="text-[10px] font-mono text-luxe-gold">
                  {log.rating}/5
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {logs.length === 0 && (
          <div className="h-full flex items-center justify-center text-zinc-800 font-mono text-[10px] uppercase tracking-widest">
            Awaiting sensory pulse...
          </div>
        )}
      </div>
    </div>
  );
};
