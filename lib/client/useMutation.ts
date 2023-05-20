import { useCallback, useState } from "react";

type CommonDataType = { ok?: boolean; message?: string; error?: unknown };
export default function useMutation<
  DataType = CommonDataType,
  VariableType = any
>(
  url: string,
  options?: {
    onCompleted?: (data: DataType & CommonDataType) => void;
    onError?: (error: unknown) => void;
  }
): readonly [
  (payload?: VariableType) => void,
  { loading: boolean; data?: DataType; error?: string }
] {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>();
  const [error, setError] = useState<string>();

  const mutation = useCallback((payload?: VariableType) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload ? JSON.stringify(payload) : undefined,
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        options?.onCompleted?.(data);
      })
      .catch((error) => {
        setError(error);
        options?.onError?.(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return [mutation, { loading, data, error }];
}
