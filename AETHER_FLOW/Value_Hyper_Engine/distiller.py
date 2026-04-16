class ValueDistiller:
    def process(self, signals):
        print(f"[Value_Hyper] Distilling {len(signals)} signals...")
        return [s for s in signals if s["roi"] > 0.90]
distiller = ValueDistiller()