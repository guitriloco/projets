import datetime
import os

class GrowthLedger:
    def log_execution(self, action_id, result, strategy):
        timestamp = datetime.datetime.now().isoformat()
        log_path = "/home/engine/AETHER_FLOW/Intelligence_Report/growth_log.txt"
        entry = f"[{timestamp}] ID: {action_id} | STRATEGY: {strategy} | RESULT: {result}\n"
        with open(log_path, "a") as f:
            f.write(entry)
        print(f"[Sovereign_Executor] Strategy logged: {action_id}")

ledger = GrowthLedger()
