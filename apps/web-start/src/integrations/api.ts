import { useAuth0 } from '@auth0/auth0-react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query';

class RedirectingForAuthError extends Error {
  constructor() {
    super('Redirecting for authentication');
    this.name = 'RedirectingForAuthError';
  }
}

export type CurrentUser = {
  id: string;
  name?: string | null;
  email?: string | null;
};

export function useApiClient() {
  const { getAccessTokenSilently, loginWithRedirect, isAuthenticated } =
    useAuth0();

  async function getToken() {
    if (!isAuthenticated) {
      console.error('❌ Not authenticated - cannot get token');
      throw new RedirectingForAuthError();
    }

    try {
      console.log('🔑 Attempting to get access token...');
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      console.log('✅ Token obtained:', token.substring(0, 50) + '...');
      return token;
    } catch (error: any) {
      console.error('❌ Failed to get token:', error);
      if (
        error.error === 'consent_required' ||
        error.error === 'login_required'
      ) {
        await loginWithRedirect({
          authorizationParams: {
            prompt: 'consent',
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
          appState: {
            returnTo: window.location.pathname,
          },
        });
        throw new RedirectingForAuthError();
      }
      throw error;
    }
  }

  async function request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = await getToken();

    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + endpoint,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  return { request, isEnabled: isAuthenticated };
}

export function useApiQuery<T>(
  queryKey: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  const { request, isEnabled } = useApiClient();

  return useQuery<T>({
    queryKey,
    queryFn: () => request<T>(endpoint),
    enabled: isEnabled,
    retry: (failureCount, error) => {
      if (error instanceof RedirectingForAuthError) {
        return false;
      }
      return failureCount < 3;
    },
    ...options,
  });
}

export function useApiMutation<Input = void, Output = unknown>(
  endpoint: string | ((input: Input) => string),
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: Omit<UseMutationOptions<Output, Error, Input>, 'mutationFn'> & {
    invalidateQueries?: string[][];
  },
) {
  const { request } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Output, Error, Input>({
    mutationFn: (data: Input) => {
      const finalEndpoint = typeof endpoint === 'function' ? endpoint(data) : endpoint;
      return request<Output>(finalEndpoint, {
        method,
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    onSuccess: (data, variables, context) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

export function useCurrentUser() {
  return useApiQuery<CurrentUser>(['user', 'me'], '/users/me');
}
