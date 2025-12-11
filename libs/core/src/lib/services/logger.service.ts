import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(...args: any[]): void {
    console.log('[ALM]', ...args);
  }

  error(...args: any[]): void {
    console.error('[ALM]', ...args);
  }

  warn(...args: any[]): void {
    console.warn('[ALM]', ...args);
  }
}
