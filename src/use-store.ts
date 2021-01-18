import { MutableStore, ReadOnlyStore, StoreSet, StoreUpdate } from "@propero/easy-store";
import { useEffect, useState } from "react";

export function useStore<T>(
  store: MutableStore<T>
): [value: T, setValue: StoreSet<T>, update: StoreUpdate<T>];
export function useStore<T>(store: ReadOnlyStore<T>): [value: T];
export function useStore<T>(
  store: ReadOnlyStore<T> | MutableStore<T>
): [value: T, setValue?: StoreSet<T>, update?: StoreUpdate<T>] {
  const { setValue, update } = store as MutableStore<T>;
  const [value, setReactValue] = useState(store.getValue());

  useEffect(() => {
    store.sub(setReactValue);
    return () => store.unsub(setReactValue);
  }, [store]);

  if (setValue && update) return [value, setValue, update];
  return [value];
}
