import { useState, useCallback, type FormEvent } from "react";

export function useAsyncFormAction<TState>(
  action: (prevState: TState, formData: FormData) => Promise<TState>,
  initialState: TState
) {
  const [state, setState] = useState<TState>(initialState);
  const [isPending, setIsPending] = useState(false);

  const formAction = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsPending(true);

      try {
        const formData = new FormData(e.currentTarget);
        const newState = await action(state, formData);
        setState(newState);
      } finally {
        setIsPending(false);
      }
    },
    [action, state]
  );

  return [state, formAction, isPending] as const;
}
