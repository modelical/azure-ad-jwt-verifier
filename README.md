# Azure AD JWT Verifier

Verify JWT issued by Azure Active Directory B2C.

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [References](#references)
- [Development](#development)

# Features

- 🎉 **Verify JWT** issued by Azure Active Directory B2C.
- 🚀 Automatically use the **rotated public keys** from Azure.
- 💪 Written in **TypeScript**.
- ♻️ **Configurable cache** for public keys.
- 🔌 Compatible with **ES modules** and **CommonJS** projects.

# Installation

```bash
npm install azure-ad-jwt-verifier --save
```

# Usage

### Verify

```ts
import { verify, VerifyOptions } from 'azure-ad-jwt-verifier';

const options: VerifyOptions = {
  jwksUri: 'https://login.microsoftonline.com/common/discovery/keys',
  issuer: 'https://sts.windows.net/<tenant_id>/',
  audience: '<audience_id>',
};

verify(token, options)
  .then((decoded) => {
    // verified and decoded token
    console.log(decoded);
  })
  .catch((error) => {
    // invalid token
    console.error(error);
  });
```

Verify options:

| Property   | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `jwksUri`  | `string` | `jwk_uri` value obtained from B2C policy metadata endpoint. |
| `issuer`   | `string` | `issuer` value obtained from B2C policy metadata endpoint.  |
| `audience` | `string` | Audience ID of the application accessing the tenant.        |

Example metadata endpoints:

- https://login.microsoftonline.com/common/.well-known/openid-configuration
- https://login.microsoftonline.com/common/discovery/keys

### Configuration

```ts
import { setConfig } from 'azure-ad-jwt-verifier';

setConfig({
  cacheLifetime: 12 * (60 * 60 * 1000), // 12 hours
});
```

Configuration options:

| Property        | Type     | Description                                  | Default |
| --------------- | -------- | -------------------------------------------- | ------- |
| `cacheLifetime` | `number` | Number of milliseconds to cache public keys. | 1 hour  |

# References

- [Overview of tokens in Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview)
- [Microsoft identity platform access tokens](https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens)
- [RSA Key Converter](https://superdry.apphb.com/tools/online-rsa-key-converter)

# Development

```
npm install
npm run build
```
