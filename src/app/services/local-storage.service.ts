import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
  private readonly localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage; 
  }

  setItem(key: string, value: any): void {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value: any | undefined = this.localStorage.getItem(key);
    
    if (value) {
      return JSON.parse(value);
    }

    return value;
  }
}