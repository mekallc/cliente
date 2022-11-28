import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setStorage = async (key: string, value: any) => {
    await Preferences.set({ key, value: JSON.stringify(value)});
  };

  setStorageValue = async (key: string, value: any) => {
    await Preferences.set({ key, value});
  };

  getStorage = async (key: string) => {
    const { value } = await Preferences.get({ key });
    return JSON.parse(value);
  };

  getStorageValue = async (key: string) => {
    const { value } = await Preferences.get({ key });
    return value;
  };

  removeStorage = async (key: string) => {
    await Preferences.remove({ key });
  };

  clearStorages = async () => {
    await Preferences.clear();
  };
}
