import { useReducer, useEffect, useCallback } from "react";

interface QueryResult<T> {
  data: T | unknown;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  isSuccess: boolean;
  isError: boolean;
}

interface QueryState<T> {
  data: T | unknown;
  loading: boolean;
  error: Error | null;
}

type QueryAction<T> =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_FAILURE"; payload: Error };

function queryReducer<T>(
  state: QueryState<T>,
  action: QueryAction<T>
): QueryState<T> {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      throw new Error();
  }
}

const cache: Record<string, any> = {};

/**
 * It fetches data from a URL, caches the result, and returns an object with the data, loading state,
 * error state, and a refetch function
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options] - RequestInit
 * @returns An object with the following properties:
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit
): QueryResult<T> {
  const [state, dispatch] = useReducer(queryReducer, {
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const cachedData = cache[url];
      if (cachedData) {
        dispatch({ type: "FETCH_SUCCESS", payload: cachedData });
      } else {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const jsonData = (await response.json()) as T;
        cache[url] = jsonData;
        dispatch({ type: "FETCH_SUCCESS", payload: jsonData });
      }
    } catch (err) {
      dispatch({ type: "FETCH_FAILURE", payload: err as Error });
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    delete cache[url];
    fetchData();
  }, [url, fetchData]);

  const isSuccess = !state.loading && !state.error;
  const isError = !!state.error;

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch,
    isSuccess,
    isError,
  };
}
