import { isRedirectError } from "next/dist/client/components/redirect";
import { AppError, AppErrorType, IAppErrorData } from "../error/app-error";

/**
 * Action response contract.
 * @template T Data type. undefined is not allowed.
 */
export interface IActionResponse<T> {
  /**
   * Fetch error if any.
   */
  error?: IAppErrorData;
  /**
   * Response data if any. Required if error is falsy.
   */
  data?: T;
}

/**
 * Use in server actions. Pack any raw object response or any thrown {@link AppError} into serializable format.
 * @template T Data type. Should be raw object and not undefined.
 * @param action A promise that resolves to any raw object data.
 * @returns
 */
export async function packActionResponse<T>(
  action: Promise<T>,
): Promise<IActionResponse<T>> {
  let data: T;
  try {
    data = await action;
  } catch (e) {
    /**
     * ignore redirect "error"
     * https://stackoverflow.com/a/78266392/14749257
     */
    if (isRedirectError(e)) {
      throw e;
    } else if (e instanceof TypeError) {
      console.log(e);
      return { error: { code: AppErrorType.connection, message: e.message } };
    } else if (e instanceof AppError) {
      return { error: e.errorData };
    } else {
      console.error("An unknown error occurred in action:\n", e);
      return {
        error: { code: AppErrorType.unknown, message: "unknown error" },
      };
    }
  }

  return { data: data };
}

/**
 * Use in client. Unpack any {@link IActionResponse} back to raw object. Or throw {@link AppError} if any.
 * @param response
 * @returns
 */
export function unpackActionResponse<T>(response: IActionResponse<T>): T {
  /**
   * MARK: A normal redirect also resolves to undefined.
   * There is no way to check if the redirect is successful or timeout.
   * (See: https://github.com/vercel/next.js/discussions/49426)
   * Since server crashes don't happen often, we just indicate a success and do not throw an error.
   */
  // if (!response) {
  //   console.error(
  //     "Response is undefined. A connection error might have occurred.",
  //   );
  //   throw new ConnectionAppError();
  // }
  if (response.error) {
    console.error(response.error);
    throw new AppError(response.error);
  }
  return response.data!;
}
