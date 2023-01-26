import { useState } from "react"

export const useCount = () => {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount((prev) => (prev + 1));
  }

  const sub = () => {
    setCount((prev) => (prev - 1));
  }

  const set2zero = () => {
    setCount(0);
  }

  return {count, add, sub, set2zero};
}