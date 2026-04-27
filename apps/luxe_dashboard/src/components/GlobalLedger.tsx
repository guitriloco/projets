"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hash, CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchZenithSignals } from "@/lib/api";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Signal {
  id: string;
  source: string;
  insight: string;
  timestamp: string;
  metric: string;
}

export const GlobalLedger = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const updateSignals = async () => {
      try {
        const data = await fetchZenithSignals();
        if (data && data.length > 0) {
          const newSignals = data.map((s: any) => ({
            id: Math.random().toString(36).substring(2, 7),
            source: s.source || "ZENITH",
            insight: s.insight,
            metric: s.efficiency_metric ? (s.efficiency_metric * 100).toFixed(2) + "%" : "N/A",
            timestamp: new Date(s.timestamp * 1000).toLocaleTimeString(),
          }));
          setSignals((prev) => [...newSignals, ...prev].slice(0, 20));
          setIsConnected(true);
        }
      } catch (e) {
        console.error("Failed to fetch signals", e);
        setIsConnected(false);
      }
    };

    updateSignals();
    const interval = setInterval(updateSignals, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-morphism p-8 rounded-none border-zinc-900/50 h-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-white mb-1">
            Zenith Signal Feed
          </h2>
          <p className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase">
            Data Mesh -> Wraith Interlace
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-zinc-900 px-4 py-2 border border-zinc-800">
          <div className={cn(
            "w-2 h-2 rounded-full animate-pulse",
            isConnected ? "bg-luxe-emerald" : "bg-luxe-ruby"
          )} />
          <span className="text-[10px] font-mono text-zinc-400">
            {isConnected ? "LIVE" : "DISCONNECTED"}
          </span>
        </div>
      </div>

      <div className="space-y-3 font-mono">
        <div className="grid grid-cols-12 text-[10px] text-zinc-600 uppercase pb-4 border-b border-zinc-900 font-bold tracking-widest">
          <div className="col-span-2">SOURCE</div>
          <div className="col-span-6">INSIGHT</div>
          <div className="col-span-2 text-right">METRIC</div>
          <div className="col-span-2 text-right">TIME</div>
        </div>

        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence initial={false}>
            {signals.length > 0 ? signals.map((sig, i) => (
              <motion.div
                key={sig.id + i}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                className="grid grid-cols-12 text-[10px] py-4 border-b border-zinc-900 group hover:bg-zinc-900/40 transition-colors"
              >
                <div className="col-span-2 text-luxe-gold">{sig.source}</div>
                <div className="col-span-6 text-zinc-400 truncate group-hover:text-white transition-colors pr-4">
                  {sig.insight}
                </div>
                <div className="col-span-2 text-right text-luxe-emerald font-medium">
                  {sig.metric}
                </div>
                <div className="col-span-2 text-right text-zinc-600">
                  {sig.timestamp}
                </div>
              </motion.div>
            )) : (
              <div className="py-20 text-center text-zinc-800 font-mono text-[10px] uppercase tracking-[0.3em]">
                Awaiting Data Stream...
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
