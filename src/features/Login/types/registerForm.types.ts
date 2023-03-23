/* eslint-disable import/prefer-default-export */
import {
  string, type, undefined, union,
} from 'io-ts';

export const ErrorType = type({
  name: string,
  message: string,
  stack: union([string, undefined]),
});
