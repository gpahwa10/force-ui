"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { WS_FULL_URL } from "./config";

const WS_LOG_PREFIX = "[WebSocket]";

function wsLog(message: string, data?: unknown) {
  const ts = new Date().toISOString();
  if (data !== undefined) {
    console.log(`${WS_LOG_PREFIX} ${ts} ${message}`, data);
  } else {
    console.log(`${WS_LOG_PREFIX} ${ts} ${message}`);
  }
}

export type WebSocketStatus =
  | "connecting"
  | "open"
  | "closing"
  | "closed"
  | "error";

export type UseWebSocketOptions = {
  /** Connect on mount. Default true. */
  connect?: boolean;
  /** Max number of messages to keep in history for testing. Default 50. */
  maxMessageHistory?: number;
  /** Log connection status and messages to console. Default true. */
  logging?: boolean;
};

export type UseWebSocketReturn = {
  status: WebSocketStatus;
  lastMessage: string | null;
  messageHistory: string[];
  messageCount: number;
  connect: () => void;
  disconnect: () => void;
  send: (data: string | object) => void;
  clearHistory: () => void;
};

export function useWebSocket(
  options: UseWebSocketOptions = {}
): UseWebSocketReturn {
  const {
    connect: shouldConnect = true,
    maxMessageHistory = 50,
    logging = true,
  } = options;
  const [status, setStatus] = useState<WebSocketStatus>("closed");
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [messageCount, setMessageCount] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageCountRef = useRef(0);

  const clearHistory = useCallback(() => {
    messageCountRef.current = 0;
    setMessageHistory([]);
    setMessageCount(0);
    setLastMessage(null);
    if (logging) wsLog("Message history cleared");
  }, [logging]);

  const disconnect = useCallback(() => {
    if (logging) wsLog("Disconnect requested");
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setStatus("closed");
  }, [logging]);

  const connect = useCallback(() => {
    if (typeof window === "undefined") return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setStatus("connecting");
    messageCountRef.current = 0;
    if (logging) wsLog("Connecting…", { url: WS_FULL_URL });
    const ws = new WebSocket(WS_FULL_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("open");
      if (logging)
        wsLog("Connected", {
          url: WS_FULL_URL,
          readyState: ws.readyState,
        });
    };
    ws.onclose = (event) => {
      setStatus("closed");
      wsRef.current = null;
      if (logging)
        wsLog("Connection closed", {
          code: event.code,
          reason: event.reason || "(none)",
          wasClean: event.wasClean,
        });
    };
    ws.onerror = () => {
      setStatus("error");
      if (logging) wsLog("Connection error", { url: WS_FULL_URL });
    };
    ws.onmessage = (event) => {
      const raw =
        typeof event.data === "string" ? event.data : String(event.data);
      messageCountRef.current += 1;
      const count = messageCountRef.current;
      setLastMessage(raw);
      setMessageCount(count);
      setMessageHistory((prev) => {
        const next = [...prev, raw].slice(-maxMessageHistory);
        return next;
      });
      if (logging) {
        const preview = raw.length > 120 ? `${raw.slice(0, 120)}…` : raw;
        wsLog(`Message #${count} received (${raw.length} chars)`, { preview });
      }
    };
  }, [maxMessageHistory, logging]);

  useEffect(() => {
    if (shouldConnect) connect();
    return () => disconnect();
  }, [shouldConnect, connect, disconnect]);

  const send = useCallback((data: string | object) => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) return;
    const payload = typeof data === "string" ? data : JSON.stringify(data);
    wsRef.current.send(payload);
  }, []);

  return {
    status,
    lastMessage,
    messageHistory,
    messageCount,
    connect,
    disconnect,
    send,
    clearHistory,
  };
}
