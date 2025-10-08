const getBackendUrl = () => {
  // In development, use the environment variable
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  }
  // In production, use the Render backend
  return 'https://f25-cisc474-individual-uiof.onrender.com';
};

export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return () =>
    fetch(getBackendUrl() + endpoint).then((res) =>
      res.json(),
    );
}
