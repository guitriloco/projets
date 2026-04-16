import datetime

class GrowthLedger:
    """Logs all autonomous business decisions and executions."""
    def log_execution(self, action_name, result):
        timestamp = datetime.datetime.now().isoformat()
        log_entry = f"[{timestamp}] ACTION: {action_name} | RESULT: {result}\n"
        with open("/home/engine/AETHER_FLOW/Intelligence_Report/growth_log.txt", "a") as f:
            f.write(log_entry)
        print(f"[Sovereign_Executor] Logged: {action_name}")

ledger = GrowthLedger()
