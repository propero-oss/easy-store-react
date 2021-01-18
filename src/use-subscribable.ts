import { Subscribable, Subscriber } from "@propero/easy-store";
import { useEffect } from "react";

export function useSubscribable<T extends unknown[]>(
  subscribable: Subscribable<T>,
  handler: Subscriber<T>
): void {
  useEffect(() => {
    subscribable.sub(handler);
    return () => subscribable.unsub(handler);
  }, [subscribable, handler]);
}
