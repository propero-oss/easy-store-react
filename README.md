[![Maintainability](https://api.codeclimate.com/v1/badges/d480dbca4abda5c97760/maintainability)](https://codeclimate.com/github/propero-oss/easy-store-react/maintainability)

# easy-store
React bindings for [@propero/easy-store](https://github.com/propero-oss/easy-store).

    npm i @propero/easy-store-react

## Getting started
Using a store in a functional component:

```typescript jsx
import { createStore } from "@propero/easy-store";
import { useStore } from "@propero/easy-store-react";

const countStore = createStore(0);

// Every instance of counter will now use the same count value
export function Counter() {
  const [count, setCount, updateCount] = useStore(countStore);
  
  const increment = () => updateCount(count => count + 1);
  const decrement = () => updateCount(count => count - 1);
  
  return (
    <>
      <button type="button" onClick={decrement}>-</button>
      <span>{count}</span>
      <button type="button" onClick={increment}>+</button>
    </>
  );
}

export function MultipleCounters() {
  return (
    <>
      <Counter />
      <Counter />
    </>
  );
}
```

Using a subscribable:

```typescript jsx
import { createSubscribable } from "@propero/easy-store";
import { useSubscribable } from "src/use-subscribable";

const clickEvents = createSubscribable<[MouseEvent]>();
window.addEventListener("click", clickEvents.notify);

export function Popover({ target, open: initialOpen = false, children }: { target: HTMLElement; open?: boolean; children?: any }) {
  const [open, setOpen] = useState(open);
  
  function onMouseClick(ev: MouseEvent) {
    setOpen(target === ev.target || target.contains(ev.target));
  }
  
  useSubscribable(clickEvents, onMouseClick);
  
  return (
    <div className="popover" style={{display: open ? "block" : "none"}}>
      {children}
    </div>
  );
}
```
