import React from 'react';

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

export function useFetch<TData, TError = Error>(
  initialState: State<TData, TError> = {
    status: 'idle',
    data: null,
    error: null,
  }
) {
  const [state, dispatch] = React.useReducer<
    (
      state: State<TData, TError>,
      action: ActionType<TData, TError>
    ) => State<TData, TError>
  >((state, action) => ({ ...state, ...action }), initialState);

  const setData = React.useCallback(
    (data: TData) => dispatch({ data, status: 'success', error: null }),
    [dispatch]
  );
  const setError = React.useCallback(
    (error: TError) => dispatch({ error, status: 'error', data: null }),
    [dispatch]
  );

  const run = React.useCallback(
    (promise: Promise<TData>) => {
      if (!promise || !promise.then) {
        throw new Error(
          'You need to pass promise as an argument to useFetch().run function.'
        );
      }
      dispatch({ status: 'pending' });
      return promise.then(
        (data: TData) => {
          setData(data);
          return data;
        },
        (error: TError) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [dispatch, setData, setError]
  );

  return {
    ...state,
    setData,
    setError,
    run,
  };
}
