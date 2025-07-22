import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

const storage = {
  get: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === "web") {
        if (typeof localStorage === "undefined") {
          console.warn("localStorage not available");
          return null;
        }
        return localStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (e) {
      console.error(`Error getting item from storage: ${key}`, e);
      return null;
    }
  },
  set: async (key: string, value: string | null): Promise<void> => {
    try {
      if (Platform.OS === "web") {
        if (typeof localStorage === "undefined") return;
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      } else {
        if (value === null) {
          await SecureStore.deleteItemAsync(key);
        } else {
          await SecureStore.setItemAsync(key, value);
        }
      }
    } catch (e) {
      console.error(`Error setting item in storage: ${key}`, e);
    }
  },
};

type StorageState = [[boolean, string | null], (value: string | null) => void];

export function useStorageState(key: string): StorageState {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const storedValue = await storage.get(key);
        setValue(storedValue);
      } catch (e) {
        console.error(`useStorageState error for ${key}`, e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [key]);

  const updateValue = useCallback(
    (newValue: string | null) => {
      setValue(newValue);
      storage.set(key, newValue);
    },
    [key]
  );

  return [[isLoading, value], updateValue];
}
