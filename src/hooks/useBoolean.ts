import React from 'react';

export default function useBoolean(
  initialState = false,
): [boolean, { true: () => void; false: () => void; toggle: () => void }] {
  const [state, setState] = React.useState(initialState);

  const setHandlers = React.useMemo(
    () => ({
      true: () => setState(true),
      false: () => setState(false),
      toggle: () => setState((prevState) => !prevState),
    }),
    [],
  );

  return [state, setHandlers];
}
