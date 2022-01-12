export type StandardResult<T> = {
  success: boolean;
  message: string;
  data: T | null;
}

export function StandardResultData<A> (result: StandardResult<A>): StandardResult<A> {
  const { success, message, data } = result;
  return {
    success,
    message,
    data
  };
}