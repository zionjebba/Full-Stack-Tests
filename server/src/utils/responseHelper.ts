export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T | undefined;
  errors?: any;
}

/**
 * Generates a standardized success response object.
 *
 * @template T - The type of the response data.
 * @param {string} message - A descriptive message about the successful operation.
 * @param {T} [data] - Optional data to include in the response.
 * @returns {ApiResponse<T>} An object containing the success status, message, and optional data.
 */
export function successResponse<T>(message: string, data?: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

/**
 * Generates a standardized error response object.
 *
 * @param {string} message - A descriptive error message.
 * @param {any} [errors] - Optional additional error details.
 * @returns {ApiResponse} An object representing the error response.
 */
export function errorResponse(message: string, errors?: any): ApiResponse {
  return {
    success: false,
    message,
    errors,
  };
}
