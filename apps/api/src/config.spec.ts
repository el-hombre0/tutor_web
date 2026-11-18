import { describe, expect, it } from 'vitest';
import { readApiPort } from './config.js';

describe('readApiPort', () => {
  it('uses 3001 when API_PORT is absent', () => {
    expect(readApiPort({})).toBe(3001);
  });

  it('accepts a valid port', () => {
    expect(readApiPort({ API_PORT: '3100' })).toBe(3100);
  });

  it.each(['0', '65536', 'not-a-port', '3001.5'])('rejects invalid port %s', (value) => {
    expect(() => readApiPort({ API_PORT: value })).toThrow('API_PORT');
  });
});
