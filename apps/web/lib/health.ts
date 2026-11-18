interface HealthResult {
  api: 'up' | 'down';
  database: 'up' | 'down' | 'unknown';
}

type Fetcher = (url: string, init: RequestInit) => Promise<Response>;

/** Checks the API health endpoint and handles unavailable or invalid responses. */
export async function getHealth(baseUrl: string, fetcher: Fetcher): Promise<HealthResult> {
  try {
    const response = await fetcher(`${baseUrl.replace(/\/$/, '')}/health`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });
    const body: unknown = await response.json();
    if (typeof body === 'object' && body !== null && 'api' in body && 'database' in body &&
        body.api === 'up' && ((response.status === 200 && body.database === 'up') ||
        (response.status === 503 && body.database === 'down'))) {
      return { api: 'up', database: body.database };
    }
  } catch {
    // The API is unreachable or returned an invalid response.
  }
  return { api: 'down', database: 'unknown' };
}
