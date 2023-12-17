import { roundDecimals } from './mathUtils';

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
    logEvent(`WS: 🔑 ${event.data?.key ?? 0} 🎚️ ${event.data?.velocity ?? 0} 📈 ${roundDecimals(event.data?.velocity ?? 0 / 127)}`);
  });
};

export const requestData = async (payload) => {
  const res = await fetch('/api/test', payload);
  const data = await res.json();

  return `[GET] data received: ${JSON.stringify(data)}`;
};
