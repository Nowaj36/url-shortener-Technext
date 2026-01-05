import * as bcrypt from 'bcrypt';

export const hashData = (data: string) =>
  bcrypt.hash(data, 12);

export const compareHash = (data: string, hash: string) =>
  bcrypt.compare(data, hash);
