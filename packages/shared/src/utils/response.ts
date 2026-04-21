import type { ApiError, ApiMeta, ApiSuccess } from '../types/api.types.js';

export function ok<T>(data: T, meta?: ApiMeta): ApiSuccess<T> {
  return {
    success: true,
    data,
    ...(meta ? { meta } : {}),
  };
}

export function fail(error: ApiError) {
  return {
    success: false as const,
    error,
  };
}

export function badRequest(message = 'Bad request', details?: ApiError['details']) {
  return fail({
    code: 'BAD_REQUEST',
    message,
    ...(details ? { details } : {}),
  });
}

export function unauthorized(message = 'Unauthorized') {
  return fail({
    code: 'UNAUTHORIZED',
    message,
  });
}

export function forbidden(message = 'Forbidden') {
  return fail({
    code: 'FORBIDDEN',
    message,
  });
}

export function notFound(message = 'Not found') {
  return fail({
    code: 'NOT_FOUND',
    message,
  });
}

export function internalError(message = 'Internal server error') {
  return fail({
    code: 'INTERNAL_ERROR',
    message,
  });
}
