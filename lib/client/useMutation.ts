import { useCallback, useState } from "react";

export default function useMutation<DataType = any, VariableType = any>(
  url: string,
  options?: {
    onCompleted?: (data: DataType) => void;
    onError?: (error: unknown) => void;
  }
): readonly [
  (payload: VariableType) => void,
  { loading: boolean; data?: DataType; error?: string }
] {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>();
  const [error, setError] = useState<string>();

  const mutation = useCallback((payload: VariableType) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
