import { createMMKV } from "react-native-mmkv";

const storage = createMMKV();

export const storageService = {
  setItem: <T>(key: string, value: T): void => {
    try {
      storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.error("MMKV setItem error:", error);
    }
  },

  getItem: <T>(key: string): T | null => {
    try {
      const value = storage.getString(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error("MMKV getItem error:", error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    try {
      storage.remove(key);
    } catch (error) {
      console.error("MMKV removeItem error:", error);
    }
  },

  clearAll: (): void => {
    try {
      storage.clearAll();
    } catch (error) {
      console.error("MMKV clearAll error:", error);
    }
  },

  getAllKeys: (): string[] => {
    try {
      return storage.getAllKeys();
    } catch (error) {
      console.error("MMKV getAllKeys error:", error);
      return [];
    }
  },
};
