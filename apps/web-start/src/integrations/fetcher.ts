export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return () =>
    fetch(import.meta.env.VITE_BACKEND_URL + endpoint).then((res) =>
      res.json(),
    );
}

export function mutateBackend<T>(
  endpoint: string,
  method: 'POST' | 'PATCH' | 'DELETE',
  data?: unknown,
): Promise<T> {
  return fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}
