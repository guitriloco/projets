class ValueDistiller:
    """Applies Hyper-Recursion to distill real business value from signals."""
    def process(self, signals):
        print(f"[Value_Hyper] Distilling {len(signals)} signals into actionable nectar...")
        high_value = [s for s in signals if s['roi'] > 0.90]
        return high_value

distiller = ValueDistiller()
