export let webSocketEstablished = false;
let ws: WebSocket | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logEvent = (...message: any[]) => {
  console.log(...message);
};

export const establishWebSocket = () => {
  if (webSocketEstablished) return;
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);
  ws.addEventListener('open', (event) => {
    webSocketEstablished = true;
    console.log('[websocket] connection open', event);
    logEvent('[websocket] connection open');
  });
  ws.addEventListener('close', (event) => {
    console.log('[websocket] connection closed', event);
    logEvent('[websocket] connection closed');
  });
  ws.addEventListener('message', (event) => {
    console.log('[websocket] message received', event);
    logEvent(`[websocket] message received: ${event.data}`);
  });
};

export const requestData = async () => {
  const res = await fetch('/api/test');
  const data = await res.json();

  logEvent('Data from GET endpoint', data);
  return `[GET] data received: ${JSON.stringify(data)}`;
};
