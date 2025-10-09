'use server';

import { getWebRequest } from 'vinxi/http';

export async function serverFetch<T>(endpoint: string): Promise<T> {
  const request = getWebRequest();

  // Access Cloudflare environment variables from the platform context
  const env = (request as any).env;
  const backendUrl = env?.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(backendUrl + endpoint);
  return response.json();
}
