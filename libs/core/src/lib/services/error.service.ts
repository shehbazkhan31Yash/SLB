import { Injectable, inject } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private logger = inject(LoggerService);

  handleError(error: any): void {
    this.logger.error('HTTP Error:', error);
  }
}
