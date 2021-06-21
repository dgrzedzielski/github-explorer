import React from 'react';
import { useSafeDispatch } from 'hooks/use-safe-dispatch';

type Status = 'idle' | 'pending' | 'success' | 'error';

type State<TData, TError = Error> = {
  status: Status;
  data: TData | null;
  error: TError | null;
};

type SuccessAction<TData> = { status: 'success'; data: TData; error: null };
type ErrorAction<TError> = { status: 'error'; data: null; error: TError };
type PendingAction = { status: Status };

type ActionType<TData, TError> =
  | SuccessAction<TData>
  | ErrorAction<TError>
  | PendingAction;

type UseFetchReducer<TData, TError> = (
  state: State<TData, TError>,
  action: ActionType<TData, TError>
) => State<TData, TError>;

export function useFetch<TData, TError = Error>(
  initialState: State<TData, TError> = {
    status: 'idle',
    data: null,
    error: null,
  }
) {
  const [state, dispatch] = React.useReducer<UseFetchReducer<TData, TError>>(
    (state, action) => ({ ...state, ...action }),
    initialState
  );

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = React.useCallback(
    (data: TData) => safeDispatch({ data, status: 'success', error: null }),
    [safeDispatch]
  );
  const setError = React.useCallback(
    (error: TError) => safeDispatch({ error, status: 'error', data: null }),
    [safeDispatch]
  );

  const run = React.useCallback(
    (promise: Promise<TData>) => {
      if (!promise || !promise.then) {
        throw new Error(
          'You need to pass promise as an argument to useFetch().run function.'
        );
      }
      safeDispatch({ status: 'pending' });
      return promise
        .then((data: TData) => {
          setData(data);
          return data;
        })
        .catch((error: TError) => {
          setError(error);
          return error;
        });
    },
    [safeDispatch, setData, setError]
  );

  return {
    ...state,
    setData,
    setError,
    run,
  };
}
