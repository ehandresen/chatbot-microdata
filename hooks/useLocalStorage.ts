import { useState, useEffect } from "react";

/**
 * Custom hook for å håndtere lagring og henting av data i localStorage.
 * @param key - Nøkkelen som brukes i localStorage
 * @param initialValue - Startverdi hvis ingen data er lagret
 */
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Feil ved henting av ${key} fra localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Feil ved lagring av ${key} i localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;
