import { useState } from "react";

function useLocalStorage(key: string, initialValue: string) {
  // Obtener el valor del localStorage o usar el valor inicial si no existe
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState(() => {
    return storedValue ? storedValue : initialValue;
  });

  const setStoredValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
