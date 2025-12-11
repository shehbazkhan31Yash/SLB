import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Version } from '../models';

@Injectable({ providedIn: 'root' })
export class VersionApiService {
  getVersions(productId: string): Observable<Version[]> {
    return of([
      {
        id: '1',
        productId,
        version: '1.0.0',
        releaseDate: new Date().toISOString(),
        status: 'draft',
      },
    ]).pipe(delay(500));
  }

  createVersion(version: Partial<Version>): Observable<Version> {
    return of({ id: '1', ...version } as Version).pipe(delay(500));
  }
}
