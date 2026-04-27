"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Activity, Info } from "lucide-react";
import { fetchNodes } from "@/lib/api";

export const NodeHealth = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const updateNodes = async () => {
      try {
        const data = await fetchNodes();
        setNodes(data);
      } catch (e) {
        console.error("Failed to fetch nodes", e);
      }
    };

    updateNodes();
    const interval = setInterval(updateNodes, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-morphism p-8 rounded-none border-zinc-900/50 h-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-white mb-1">
            Node Health Grid
          </h2>
          <p className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase">
            Distributed Network Topology
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {nodes.length === 0 && (
          <div className="col-span-2 text-center py-10 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
            Scanning for active nodes...
          </div>
        )}
        {nodes.map((node) => (
          <motion.div
            key={node.node_id}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => setHoveredNode(node.node_id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="p-6 bg-zinc-950 border border-zinc-900 relative group cursor-crosshair overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-sm font-bold tracking-widest uppercase text-white">
                {node.node_id}_NODE
              </h3>
              <div className="w-2 h-2 rounded-full bg-luxe-gold" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-zinc-600 font-mono uppercase">STATUS</span>
                <span className="text-xs font-mono text-luxe-gold">{node.status}</span>
              </div>
              
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-zinc-600 font-mono uppercase">IP</span>
                <span className="text-xs font-mono text-zinc-400">{node.ip}</span>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-[10px] text-zinc-600 font-mono uppercase">LAST SEEN</span>
                <span className="text-xs font-mono text-luxe-emerald">{new Date(node.last_seen * 1000).toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Hover Detail Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredNode === node.node_id ? 1 : 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center pointer-events-none p-4 text-center"
            >
              <Info className="w-6 h-6 text-luxe-gold mb-2" />
              <span className="text-[10px] font-mono text-luxe-gold uppercase tracking-[0.2em] mb-1">{node.hostname}</span>
              <div className="text-[8px] font-mono text-zinc-500 uppercase">
                {Object.entries(node.capabilities || {}).map(([k, v]: any) => (
                  <div key={k}>{k}: {v}</div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
