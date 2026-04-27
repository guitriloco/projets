"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hash, CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GlobalLedger = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch("http://localhost:8000/telemetry/recent");
        if (response.ok) {
          const data = await response.json();
          // Transform telemetry into "ledger entries"
          const mapped = data.reverse().map((t: any, i: number) => ({
            id: (1000 + i).toString(),
            hash: "0x" + Math.random().toString(16).substring(2, 40),
            value: t.name,
            status: t.rating >= 4 ? "APPROVED" : "SYNCING",
            timestamp: new Date(t.timestamp * 1000).toLocaleTimeString()
          }));
          setTransactions(mapped);
          setIsConnected(true);
        }
      } catch (e) {
        console.error("Failed to fetch telemetry", e);
        setIsConnected(false);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-morphism p-8 rounded-none border-zinc-900/50 h-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-white mb-1">
            Global Ledger Feed
          </h2>
          <p className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase">
            Mirror Protocol V5.2 // Live Audit
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-zinc-900 px-4 py-2 border border-zinc-800">
          <div className={cn(
            "w-2 h-2 rounded-full animate-pulse",
            isConnected ? "bg-luxe-emerald" : "bg-luxe-ruby"
          )} />
          <span className="text-[10px] font-mono text-zinc-400">
            {isConnected ? "SYNCED" : "CONNECTING..."}
          </span>
        </div>
      </div>

      <div className="space-y-3 font-mono">
        <div className="grid grid-cols-12 text-[10px] text-zinc-600 uppercase pb-4 border-b border-zinc-900 font-bold tracking-widest">
          <div className="col-span-2">ID</div>
          <div className="col-span-5">HASH</div>
          <div className="col-span-2 text-right">VALUE</div>
          <div className="col-span-3 text-right">STATUS</div>
        </div>

        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence initial={false}>
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                className="grid grid-cols-12 text-xs py-4 border-b border-zinc-900 group hover:bg-zinc-900/40 transition-colors"
              >
                <div className="col-span-2 text-zinc-400">#{tx.id}</div>
                <div className="col-span-5 text-zinc-500 truncate group-hover:text-luxe-gold transition-colors pr-4">
                  {tx.hash}
                </div>
                <div className="col-span-2 text-right text-white font-medium">
                  {tx.value}
                </div>
                <div className="col-span-3 text-right">
                  <span
                    className={
                      tx.status === "APPROVED"
                        ? "text-luxe-emerald"
                        : tx.status === "SYNCING"
                        ? "text-luxe-gold"
                        : "text-luxe-ruby"
                    }
                  >
                    {tx.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
