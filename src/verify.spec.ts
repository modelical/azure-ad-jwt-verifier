import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { jsonWebKey } from '../testing/mock-json-web-key.js';
import {
  encodedValid,
  encodedWithoutKid,
  payload,
} from '../testing/mock-token.js';
import { clear } from './cache.js';
import { VerifyOptions } from './interfaces.js';
import { verify } from './verify.js';

describe('verify method', () => {
  const options: VerifyOptions = {
    jwksUri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys',
    issuer: 'https://login.microsoftonline.com/{tenantid}/v2.0',
    audience: '6e74172b-be56-4843-9ff4-e66a39bb12e3',
  };
  const server = setupServer(
    http.get(options.jwksUri, () => {
      return HttpResponse.json({ keys: [jsonWebKey] });
    })
  );

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    clear();
  });

  afterAll(() => server.close());

  it('should return decoded token when valid', async () => {
    const result = await verify(encodedValid, options);

    expect(result).toEqual(payload);
  });

  it('should cache http requests', async () => {
    verify(encodedValid, options);
    const result = await verify(encodedValid, options);

    expect(result).toEqual(payload);
  });

  it('should return error when token invalid', async () => {
    const result = verify('invalid_token', options);

    await expect(result).rejects.toBe('invalid token');
  });

  it('should return error when kid is missing', async () => {
    const result = verify(encodedWithoutKid, options);

    await expect(result).rejects.toBe('invalid token');
  });
});
