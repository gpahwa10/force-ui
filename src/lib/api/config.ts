/**
 * API and WebSocket config from environment.
 * Client-side (browser) needs NEXT_PUBLIC_* vars; server can use API_URL, WS_PORT too.
 */
const getEnv = (key: string, fallback?: string): string => {
  if (typeof process === "undefined" || !process.env) return fallback ?? "";
  const val = process.env[key] ?? fallback ?? "";
  return typeof val === "string" ? val.trim() : "";
};

const apiUrl =
  getEnv("NEXT_PUBLIC_API_URL") || getEnv("API_URL") || "http://localhost";
const apiPort = getEnv("NEXT_PUBLIC_API_PORT") || getEnv("API_PORT") || "3000";
const wsPort = getEnv("NEXT_PUBLIC_WS_PORT") || getEnv("WS_PORT") || "8080";

/** Base API URL including port (e.g. http://13.232.230.17:3000) */
export const API_BASE_URL =
  apiUrl.includes(":") && /:\d+$/.test(apiUrl)
    ? apiUrl.replace(/\/$/, "")
    : `${apiUrl.replace(/\/$/, "")}:${apiPort}`;

/** WebSocket URL: same host as API, WS port (e.g. ws://13.232.230.17:8080) */
function getWsUrl(): string {
  return process.env.NEXT_PUBLIC_WS_URL || "";
  // return `ws://${apiUrl}:${wsPort}`;
  // return `ws://13.232.230.17:8080`;
    // const url = new URL(apiUrl);
    // const protocol = url.protocol === "https:" ? "wss:" : "ws:";
    // console.log(`protocol: ${`${protocol}//${url.hostname}:${wsPort}`}`);
    // return `${protocol}//${url.hostname}:${wsPort}`;
  
}

export const WS_FULL_URL = getWsUrl();
