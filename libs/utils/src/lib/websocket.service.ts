import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export interface JobProgress {
  jobId: string;
  progress: number;
  status: 'running' | 'completed' | 'failed';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private jobUpdates$ = new Subject<JobProgress>();

  // Mock WebSocket/SSE connection
  startJob(jobId: string): Observable<JobProgress> {
    return interval(500).pipe(
      map((tick) => {
        const progress = Math.min((tick + 1) * 10, 100);
        return {
          jobId,
          progress,
          status: progress < 100 ? 'running' : 'completed',
          message: progress < 100 ? `Processing... ${progress}%` : 'Job completed',
        } as JobProgress;
      })
    );
  }

  subscribeToJobUpdates(): Observable<JobProgress> {
    return this.jobUpdates$.asObservable();
  }
}
