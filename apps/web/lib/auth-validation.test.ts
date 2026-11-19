import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { validateRegistration } from './auth-validation.ts';

test('registration requires a valid invitation and password', () => {
  assert.match(validateRegistration({ name: 'Иван Иванов', email: 'ivan@example.test', password: 'weak', code: '', consent: false }), /пароль/i);
  assert.match(validateRegistration({ name: 'Иван Иванов', email: 'ivan@example.test', password: 'Example123', code: '', consent: false }), /код/i);
  assert.match(validateRegistration({ name: 'Иван Иванов', email: 'ivan@example.test', password: 'Example123', code: 'TEST', consent: false }), /согласие/i);
  assert.equal(validateRegistration({ name: 'Иван Иванов', email: 'ivan@example.test', password: 'Example123', code: 'TEST', consent: true }), '');
});
