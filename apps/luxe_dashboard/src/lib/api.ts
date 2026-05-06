const API_BASE_URL = "http://localhost:8000";

export async function fetchNodes() {
  const response = await fetch(`${API_BASE_URL}/nodes`);
  if (!response.ok) throw new Error("Failed to fetch nodes");
  return response.json();
}

export async function fetchZenithSignals() {
  // We need to keep some history on the client side since the API clears it
  const response = await fetch(`${API_BASE_URL}/zenith/signals`);
  if (!response.ok) throw new Error("Failed to fetch Zenith signals");
  return response.json();
}

export async function fetchYieldHistory() {
  const response = await fetch(`${API_BASE_URL}/yield/history`);
  if (!response.ok) throw new Error("Failed to fetch yield history");
  return response.json();
}

export async function executeDirective(directive: string, payload: any = {}) {
  // Mapping directives to API calls
  if (directive === 'ACTIVATE_SPECTRE') {
    return fetch(`${API_BASE_URL}/conquer/execute?objective=MAXIMIZE_YIELD`, { method: 'POST' });
  }
  
  // Generic task enqueue for other directives
  return fetch(`${API_BASE_URL}/tasks?node_id=master`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ directive, ...payload })
  });
}

export async function fetchTelemetry() {
  // This is a bit tricky as the current API doesn't have a GET for telemetry logs yet
  // We might want to add one or just simulate for now.
  // Actually, Phase 1 added /telemetry POST, let's see if we should add a GET.
  return [];
}
