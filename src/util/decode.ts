import { Errors, Type } from 'io-ts';
import { pipe } from 'fp-ts/lib/function';
import { getOrElseW } from 'fp-ts/lib/Either';
import { failure } from 'io-ts/lib/PathReporter';

export default <ApplicationType = any, EncodeTo = ApplicationType, DecodeFrom = unknown>(
  codec: Type<ApplicationType, EncodeTo, DecodeFrom>,
) => (input: DecodeFrom): ApplicationType => pipe(
  codec.decode(input),
  getOrElseW((errors: Errors) => {
    throw new Error(failure(errors).join('\n'));
  }),
);
