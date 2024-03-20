import { timingSafeEqual } from 'crypto';
import { Request, Response, NextFunction } from 'express';

function safeCompare(userInput: string, secret: string) {
  const userInputLength = Buffer.byteLength(userInput);
  const secretLength = Buffer.byteLength(secret);

  const userInputBuffer = Buffer.alloc(userInputLength, 0, 'utf8');
  userInputBuffer.write(userInput);
  const secretBuffer = Buffer.alloc(userInputLength, 0, 'utf8');
  secretBuffer.write(secret);

  return !!(
    timingSafeEqual(userInputBuffer, secretBuffer) &&
    userInputLength === secretLength
  );
}

const CREDENTIALS_REGEXP =
  /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;

const USER_PASS_REGEXP = /^([^:]*):(.*)$/;

export function getBasicAuthFromRequest(req: Request) {
  if (!req) {
    throw new TypeError('argument req is required');
  }

  if (typeof req !== 'object') {
    throw new TypeError('argument req is required to be an object');
  }

  // get header
  const header = getAuthorization(req);

  // parse header
  return parse(header);
}

function decodeBase64(str: string) {
  return Buffer.from(str, 'base64').toString();
}

function getAuthorization(req: Request) {
  if (!req.headers || typeof req.headers !== 'object') {
    throw new TypeError('argument req is required to have headers property');
  }

  return req.headers.authorization;
}

export function parse(str: string) {
  if (typeof str !== 'string') {
    return undefined;
  }

  // parse header
  const match = CREDENTIALS_REGEXP.exec(str);

  if (!match) {
    return undefined;
  }

  // decode user pass
  const userPass = USER_PASS_REGEXP.exec(decodeBase64(match[1]));

  if (!userPass) {
    return undefined;
  }

  // return credentials object
  return {
    username: userPass[1],
    password: userPass[2],
  };
}

export function basicAuthMiddleware(
  users: { username: string; password: string }[],
) {
  const authorizer = (username: string, password: string) => {
    for (const user of users)
      if (
        safeCompare(username, user.username) &&
        safeCompare(password, user.password)
      ) {
        return true;
      }

    return false;
  };

  return (req: Request, res: Response, next: NextFunction) => {
    const credentials = getBasicAuthFromRequest(req);

    if (!credentials) {
      return unauthorized();
    }

    if (!authorizer(credentials.username, credentials.password)) {
      return unauthorized();
    }

    return next();

    function unauthorized() {
      res.set('WWW-Authenticate', 'Basic');

      return res.status(401).send('Unauthorized');
    }
  };
}
