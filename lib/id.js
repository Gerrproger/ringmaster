import crypto from 'node:crypto';

export function generateId() {
  return crypto.randomBytes(8).toString('hex');
}

export default generateId();
