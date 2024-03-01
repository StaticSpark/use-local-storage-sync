import { useEffect, useState } from "react";

export type localStorageSyncProps = [
  storageKey: string,
  defaultValue: any,
  getItemFunc?: (n: string) => any,
  setItemFunc?: (n: any) => string
];

type localStorageHook = [
  value: any,
  setValue: (arg0: any) => void,
  error: string | null,
  initialiazed: boolean
];

const useLocalStorageSync = (
  ...props: localStorageSyncProps
): localStorageHook => {
  let [
    storageKey,
    defaultValue,
    getItemFunc = (n: string) => JSON.parse(n),
    setItemFunc = (n: any) => JSON.stringify(n),
  ] = props;

  const [value, setValue] = useState(defaultValue);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isClient = typeof window !== "undefined";

  const handleLocalStorageUpdates = () => {
    const localStorageValue = localStorage.getItem(storageKey) ?? defaultValue;
    setValue(getItemFunc(localStorageValue));
  };

  // update state to new stored local Storage value
  useEffect(() => {
    try {
      if (isClient) {
        setInitialized(true);
        handleLocalStorageUpdates();
      }
    } catch (error: any) {
      console.error(error);
      setError(error);
    }
  }, []);

  // update local Storage
  useEffect(() => {
    if (initialized) {
      // run on client side only
      if (isClient) {
        localStorage.setItem(storageKey, setItemFunc(value));
      }
    }
  }, [value]);

  useEffect(() => {
    window.addEventListener("storage", handleLocalStorageUpdates);
    return () => {
      window.removeEventListener("storage", handleLocalStorageUpdates);
    };
  }, []);

  const storageUpdater: localStorageHook = [
    value,
    setValue,
    error,
    initialized,
  ];
  return storageUpdater;
};

export default useLocalStorageSync;
