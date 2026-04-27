"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, AlertTriangle, CheckCircle } from "lucide-react";

export const NovObservations = () => {
  const [observations, setObservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchObs = async () => {
      try {
        const response = await fetch("http://localhost:8000/nov/observations");
        if (response.ok) {
          const data = await response.json();
          setObservations(data.reverse());
        }
      } catch (e) {
        console.error("Failed to fetch Nov observations", e);
      }
    };

    fetchObs();
    const interval = setInterval(fetchObs, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-morphism p-8 rounded-none border-zinc-900/50 h-full overflow-hidden flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-white mb-1">
            Nov Observer Feed
          </h2>
          <p className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase">
            Predictive Anomaly Detection
          </p>
        </div>
        <Eye className="w-5 h-5 text-luxe-gold animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {observations.length === 0 && (
          <div className="text-center py-10 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
            Waiting for observer signals...
          </div>
        )}
        <AnimatePresence initial={false}>
          {observations.map((obs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-zinc-900/50 border border-zinc-800 flex items-start space-x-4"
            >
              {obs.status === "observed" ? (
                <CheckCircle className="w-4 h-4 text-luxe-emerald mt-1 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-luxe-ruby mt-1 shrink-0" />
              )}
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-zinc-400 uppercase flex justify-between w-full">
                  <span>Signal Ingested</span>
                  <span className="opacity-50">{new Date(obs.timestamp * 1000).toLocaleTimeString()}</span>
                </div>
                <div className="text-xs text-white font-mono leading-relaxed">
                   Observation stable. No critical anomalies detected in sensory pulse.
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
