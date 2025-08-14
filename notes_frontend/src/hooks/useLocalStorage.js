import { useEffect, useState, useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * useLocalStorage hook
 * Synchronizes a state value with localStorage under the given key.
 * - key: string key in localStorage
 * - initialValue: initial value or function returning initial value
 * Returns [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const initialRef = useRef(true);
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw);
    } catch (e) {
      // ignore parse errors
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    // Skip write on the first render if we loaded existing value
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore write errors (quota, privacy mode)
    }
  }, [key, value]);

  return [value, setValue];
}
