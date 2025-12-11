import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

@Injectable({ providedIn: 'root' })
export class UploadService {
  private uploadProgress$ = new Subject<UploadProgress>();

  uploadFile(file: File): Observable<UploadProgress> {
    const progress$ = new Subject<UploadProgress>();

    // Mock resumable upload using tus-js-client pattern
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progress$.next({
        fileName: file.name,
        progress,
        status: progress < 100 ? 'uploading' : 'completed',
      });

      if (progress >= 100) {
        clearInterval(interval);
        progress$.complete();
      }
    }, 300);

    return progress$.asObservable();
  }

  uploadFiles(files: FileList): Observable<UploadProgress> {
    Array.from(files).forEach((file) => {
      this.uploadFile(file).subscribe((progress) => {
        this.uploadProgress$.next(progress);
      });
    });

    return this.uploadProgress$.asObservable();
  }
}
