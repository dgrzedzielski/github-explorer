import React from 'react';

export function useSafeDispatch<S, A>(
  dispatch:
    | React.DispatchWithoutAction
    | React.Dispatch<React.ReducerAction<React.Reducer<S, A>>>
) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (arg: A) => {
      if (mounted.current) {
        dispatch(arg);
      }
    },
    [dispatch]
  );
}
