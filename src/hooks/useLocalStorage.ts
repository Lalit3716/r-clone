import { useState, useEffect } from "react";

const useLocalStorage = <T>(
  key: string,
  value: T
): [T, (newVal: T) => void] => {
  const [state, setState] = useState<T>(value);

  const changeState = (newVal: T) => {
    setState(newVal);
    localStorage?.setItem(key, JSON.stringify(newVal));
  };

  useEffect(() => {
    const storageValue = localStorage?.getItem(key);
    if (storageValue) {
      try {
        setState(JSON.parse(storageValue));
      } catch (e) {
        setState(storageValue as unknown as T);
      }
    }
  }, [key, value]);

  return [state, changeState];
};

export default useLocalStorage;
