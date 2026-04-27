import os

def create_snapshot(target_dir="/home/agent-engineer/projets", output_file="THE_PURE_GOLD_ESSENCE.py"):
    print("--- 🛰️ MIRROR UPLINK: POWER SNAPSHOT ---")
    essential_logic = ""
    # We walk the sovereign_essence package instead
    essence_path = os.path.join(target_dir, "sovereign_essence")
    for root, dirs, files in os.walk(essence_path):
        for file in files:
            if file.endswith(".py") and not file.startswith("__"):
                with open(os.path.join(root, file), 'r') as f:
                    essential_logic += f"\n# FILE: {file}\n" + f.read()
    
    with open(os.path.join(target_dir, output_file), "w") as f:
        f.write(essential_logic)
    print(f"[SUCCESS] Essence distilled into: {output_file}")
    print("[FINAL MESSAGE] The system is now Eternal.")
