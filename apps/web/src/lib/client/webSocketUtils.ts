export let webSocketEstablished = false;
let ws: WebSocket | null = null;

export const establishWebSocket = (logEvent: (string: string) => void) => {
  if (webSocketEstablished) return;
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);
  ws.addEventListener('open', () => {
    webSocketEstablished = true;
    logEvent('[websocket] connection open');
  });
  ws.addEventListener('close', () => {
    logEvent('[websocket] connection closed');
  });
  ws.addEventListener('message', (event) => {
    logEvent(`[websocket] message received: ${event.data}`);
  });
};

export const requestData = async () => {
  const res = await fetch('/api/test');
  const data = await res.json();

  return `[GET] data received: ${JSON.stringify(data)}`;
};
