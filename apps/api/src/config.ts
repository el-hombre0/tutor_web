/** Reads and validates the HTTP port for the API. */
export function readApiPort(env: NodeJS.ProcessEnv): number {
  const value = env.API_PORT ?? '3001';
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('API_PORT must be an integer between 1 and 65535');
  }

  return port;
}
