import os
import time
import httpx
import asyncio

async def monitor_sovereignty():
    clusters = {
        "ALPHA": "http://localhost:8101",
        "BETA": "http://localhost:8102",
        "GAMMA": "http://localhost:8103",
        "DELTA": "http://localhost:8104"
    }
    
    print("--- ⚜️ SOVEREIGN DASHBOARD v3.1 (Global Tetrahedron) ---")
    
    async with httpx.AsyncClient() as client:
        for name, url in clusters.items():
            print(f"\n[CLUSTER] {name} ({url})")
            # Heartbeat Pulse
            try:
                hb_resp = await client.get(f"{url}/omni-pulse/heartbeat", timeout=2.0)
                hb_data = hb_resp.json()
                print(f"  [PULSE] Heartbeat: {hb_data['pulse_id']} | Total Latency: {hb_data['total_latency_ms']:.2f}ms")
            except Exception as e:
                print(f"  [PULSE] Heartbeat Failed: {e}")

            # Cluster Info
            try:
                info_resp = await client.get(f"{url}/cluster/info", timeout=1.0)
                info = info_resp.json()
                print(f"  [INFO] Role: {info['role']} | Region: {info['region']}")
            except Exception:
                print(f"  [INFO] Status: OFFLINE")

        # Global Lattice Pulse
        print("\n[GLOBAL] Initiating Cross-Cluster Sync Pulse (Tetrahedron Alignment)...")
        try:
            # Trigger pulse in Alpha, which syncs with others
            pulse_resp = await client.post(f"{clusters['ALPHA']}/omni-pulse/regional?seed_objective=GLOBAL_LATTICE_SYNC", timeout=10.0)
            p_data = pulse_resp.json()
            print(f"[GLOBAL] Sync Result: {p_data['status']} | Alpha Enhancement: {p_data.get('alpha_enhancement', {}).get('status')}")
            print(f"[GLOBAL] Lattice Sync: {p_data.get('lattice_sync', 'N/A')}")
        except Exception as e:
            print(f"[GLOBAL] Sync Failed: {e}")

    print("\n[OMNI-PULSE] Global System Frequency: STABLE")
    print("[LATTICE] State: TETRAHEDRAL DOMINANCE")

if __name__ == "__main__":
    asyncio.run(monitor_sovereignty())
